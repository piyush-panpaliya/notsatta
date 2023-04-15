import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { Base64 } from 'js-base64';
import { clerkClient } from "@clerk/nextjs/server";



export const roomRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ roomName: z.string().min(2).max(15) }))
    .mutation(async ({ input,ctx:{auth,prisma} }) => {
      if(auth.user?.publicMetadata?.room) throw new TRPCError({ code: 'FORBIDDEN' })
      const room = await prisma.room.create({
        data: {
          name: input.roomName,
          admin:auth.userId,
        },
      })
      return {
        roomInv:  Buffer.from(room.id).toString('base64'),
        roomid: room.id,
      };
    }),
  join: protectedProcedure
    .input(z.object({ slug: z.string().refine(Base64.isValid) }))
    .mutation(async ({ input,ctx:{auth,prisma} }) => {

      if((await clerkClient.users.getUser(auth.userId)).publicMetadata?.room) throw new TRPCError({ code: 'FORBIDDEN' })
      const room = await prisma.room.findUnique({
        where: {
          id: Buffer.from(input.slug, 'base64').toString(),
        },
        select: {id:true,name:true}
      })

      if(!room) throw new TRPCError({ code: 'NOT_FOUND' })
      await clerkClient.users.updateUserMetadata(auth.userId, { 
        publicMetadata: {room:room.id} 
      })
      // console.log(await clerkApi.users.updateUser(auth.userId, {room:room.id}))
      return room
    }),
  leave: protectedProcedure
    .input(z.object({ slug: z.string().refine(Base64.isValid) }))
    .mutation(async ({ input,ctx:{auth,prisma} }) => {
      if(!(auth.user?.publicMetadata?.room)) throw new TRPCError({ code: 'FORBIDDEN' })
      const roomId=Buffer.from(input.slug, 'base64').toString()
      const room = await prisma.room.findUnique({
        where: {
          id: roomId,
        },
        select: {id:true}
      })
      if(!room) throw new TRPCError({ code: 'NOT_FOUND' })
      console.log(await clerkClient.users.updateUser(auth.userId, { publicMetadata: {room:room.id} }))
      return room
    }),
  get: protectedProcedure
    .query(async ({ctx:{auth,prisma} }) => {
      if(!(auth.user?.publicMetadata?.room)) throw new TRPCError({ code: 'FORBIDDEN' })
      const room = await prisma.room.findUnique({
        where: {
          id: auth.user.publicMetadata.room.toString(),
        },
      })
      if(!room) throw new TRPCError({ code: 'NOT_FOUND' })
      // console.log(await clerkApi.users.updateUser(auth.userId, {room:room.id}))
      return room
    })
});


