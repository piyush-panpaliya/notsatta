import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs/server";
import { voteRouter } from "./vote";
import { getMatch } from "~/utils/cricket";

export const matchRouter = createTRPCRouter({
  vote:voteRouter,
  getcmatches: protectedProcedure
    .query(async ({ctx:{auth,prisma}}) => {
      const user = await clerkClient.users.getUser(auth.userId)
      if(!user.publicMetadata?.room) throw new TRPCError({ code: 'FORBIDDEN' })
      const room = await prisma.room.findUnique({
        where: {
          id: user.publicMetadata?.room as string,
        },
        select: {id:true,name:true}
      })
      if(!room) throw new TRPCError({ code: 'NOT_FOUND' })
      
      const cmatches = await prisma.cmatch.findMany({
        where: {
          roomId: room.id,
          OR:[
            {status:'OPEN'},
            {status:"LIVE"},
          ]
        },
        include: {
          match: {
            include: {
              teams: true,
            }
          }
        }
      })
      return cmatches
  }),
  getcmatch: protectedProcedure
  .input(z.object({inpMatchId:z.string().length(5)}))
  .query(async ({input,ctx:{auth,prisma}}) => {
    const user = await clerkClient.users.getUser(auth.userId)
    if(!user.publicMetadata?.room) throw new TRPCError({ code: 'FORBIDDEN' })
    const room = await prisma.room.findUnique({
      where: {
        id: user.publicMetadata?.room as string,
      },
      select: {id:true,name:true}
    })
    if(!room) throw new TRPCError({ code: 'NOT_FOUND' })
    
    const cmatches = await prisma.cmatch.findFirst({
      where: {
        roomId: room.id,
        matchId: parseInt(input.inpMatchId),
      },
      include: {
        match: {
          include: {
            teams: true,
          }
        },
        votes: true,
        winner: true
      }
    })
    return cmatches
}),
})