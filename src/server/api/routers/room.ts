import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { Base64 } from 'js-base64';
import { clerkClient } from "@clerk/nextjs/server";
import matches from '~/utils/matches'
import { getBaseUrl } from "~/utils/api";
import { getMatch } from "~/utils/cricket";

export const roomRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ roomName: z.string().min(2).max(15) }))
    .mutation(async ({ input, ctx: { auth, prisma } }) => {
      if (auth.user?.publicMetadata?.room) throw new TRPCError({ code: 'FORBIDDEN' })
      const room = await prisma.room.create({
        data: {
          name: input.roomName,
          admin: auth.userId,
        },
      })
      const newuser = await clerkClient.users.updateUserMetadata(auth.userId, {
        publicMetadata: { room: room.id }
      })
      await prisma.user.upsert({
        where: { id: newuser.id },
        update: { roomId: newuser.publicMetadata.room as string },
        create: { id: auth.userId, roomId: newuser.publicMetadata.room as string, username: "user" }
      })
      const todayMatch = matches.filter(match => match.startTime.toDateString() === new Date().toDateString());
      const fetchedMatch = await Promise.all(todayMatch.map(async (match) => await getMatch(match.link)))
      console.log(fetchedMatch)
      await fetch(`${getBaseUrl()}/api/cron/updateMatchList`, {
        headers: { secret: process.env.CRON_KEY as string },
        method: 'POST',
        body: JSON.stringify(fetchedMatch)
      })
      todayMatch.forEach(async (match) => {
        await fetch(`${getBaseUrl()}/api/cron/matchLive`, {
          method: 'POST',
          body: JSON.stringify(match)
        })
      })
      console.log({
        roomInv: Buffer.from(room.id).toString('base64'),
        roomid: room.id,
        name: room.name
      })
      return {
        roomInv: Buffer.from(room.id).toString('base64'),
        roomid: room.id,
        name: room.name
      };
    }),
  join: protectedProcedure
    .input(z.object({ slug: z.string().refine(Base64.isValid) }))
    .mutation(async ({ input, ctx: { auth, prisma } }) => {

      if ((await clerkClient.users.getUser(auth.userId)).publicMetadata?.room) throw new TRPCError({ code: 'FORBIDDEN' })
      const room = await prisma.room.findUnique({
        where: {
          id: Buffer.from(input.slug, 'base64').toString(),
        },
        select: { id: true, name: true }
      })

      if (!room) throw new TRPCError({ code: 'NOT_FOUND', message: 'Room not found' })
      const newuser = await clerkClient.users.updateUserMetadata(auth.userId, {
        publicMetadata: { room: room.id }
      })
      await prisma.user.upsert({
        where: { id: newuser.id },
        update: { roomId: newuser.publicMetadata.room as string },
        create: { id: auth.userId, roomId: newuser.publicMetadata.room as string, username: "user" }
      })
      return room
    }),
  leave: protectedProcedure
    .input(z.object({ slug: z.string().refine(Base64.isValid) }))
    .mutation(async ({ input, ctx: { auth, prisma } }) => {
      if (!(auth.user?.publicMetadata?.room)) throw new TRPCError({ code: 'FORBIDDEN' })
      const roomId = Buffer.from(input.slug, 'base64').toString()
      const room = await prisma.room.findUnique({
        where: {
          id: roomId,
        },
        select: { id: true }
      })
      if (!room) throw new TRPCError({ code: 'NOT_FOUND' })
      console.log(await clerkClient.users.updateUser(auth.userId, { publicMetadata: { room: room.id } }))
      await prisma.user.update({
        where: { id: auth.userId },
        data: { roomId: null }
      })
      return room
    }),
  get: protectedProcedure
    .query(async ({ ctx: { auth, prisma } }) => {
      const roomId = (await clerkClient.users.getUser(auth.userId)).publicMetadata?.room as string | undefined
      if (!roomId) throw new TRPCError({ code: 'FORBIDDEN' })
      const room = await prisma.room.findUnique({
        where: {
          id: roomId.toString(),
        },
        include: {
          users: true
        }
      })
      if (!room) throw new TRPCError({ code: 'NOT_FOUND' })
      // console.log(await clerkApi.users.updateUser(auth.userId, {room:room.id}))
      return room
    }),
  leaderboardGet: protectedProcedure
    .query(async ({ ctx: { auth, prisma } }) => {
      const roomId = (await clerkClient.users.getUser(auth.userId)).publicMetadata?.room as string | undefined
      if (!roomId) throw new TRPCError({ code: 'FORBIDDEN' })
      const room = await prisma.room.findUnique({
        where: {
          id: roomId.toString(),
        },
        include: {
          users: true
        }
      })
      if (!room) throw new TRPCError({ code: 'NOT_FOUND' })
      const users = await prisma.user.findMany({
        where: {
          roomId: room.id,
          votes: {
            some: {
              roomId: room.id
            }
          }
        },
        include: {
          votes: true,
        },
      })
      const leaderboard = await Promise.all(users.map(async (user) => ({
        id: user.id,
        username: user.username,
        points: user.votes.filter(vote => vote.won).length,
        image: (await clerkClient.users.getUser(user.id)).profileImageUrl
      })))
      console.log(leaderboard)
      return leaderboard.sort((a, b) => b.points - a.points)
    })
});


