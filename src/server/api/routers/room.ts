import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { Base64 } from 'js-base64';
import { clerkClient } from "@clerk/nextjs/server";
import matches from '~/utils/matches'
import { getBaseUrl } from "~/utils/api";
import { getMatch } from "~/utils/cricket";

const findPoints = (id: string) => {
  const roomUser = [
    {
      id: 'user_2P7L978F3fR68Kq5X3E3uAZkxm5',
      score: 0
    },
    {
      id: 'user_2P7LURqI1lbk1TVKzpdnsfEvslt',
      score: 0
    },
    {
      id: 'user_2P8ejCnyJFDms0EPQscWFvqRTP8',
      score: 0
    },
    {
      id: 'user_2P8fAfOmLwJl6Vq5hA5ZIejHEkX',
      score: 0
    },
    {
      id: 'user_2P8if0ySNJ0lU6Ty1sqiel3PKcR',
      score: 0
    },
    {
      id: 'user_2P8lBijfQjuf50Z6tT6uJq3PlRq',
      score: 0
    },
    {
      id: 'user_2P8lderXnWCe9rDtC8ZJd45nWEb',
      score: 0
    },
    {
      id: 'user_2PEFlYZ3iYUI8rPO6rqKAX4AwMB',
      score: 0
    }
  ]
  return roomUser.find(user => user.id === id)?.score || 0
}

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
      const todayMatch = matches.filter(match => match.startTime.toDateString() === new Date(Date.now() + 5.5 * 3600 * 1000).toDateString());
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
    .mutation(async ({ ctx: { auth, prisma } }) => {
      const roomId = (await clerkClient.users.getUser(auth.userId)).publicMetadata?.room as string
      if (!roomId) throw new TRPCError({ code: 'FORBIDDEN' })
      const room = await prisma.room.findUnique({
        where: {
          id: roomId,
        },
        select: { id: true }
      })
      if (!room) throw new TRPCError({ code: 'NOT_FOUND' })
      console.log(await clerkClient.users.updateUser(auth.userId, { publicMetadata: { room: null } }))
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
      if (room.id === "clh2hjkbe0000lf08yapkgid1") {
        const leaderboardNew = leaderboard.map((user) => {
          return { ...user, points: user.points + findPoints(user.id) }
        })
        return leaderboardNew.sort((a, b) => b.points - a.points)
      }
      return leaderboard.sort((a, b) => b.points - a.points)
    })
});


