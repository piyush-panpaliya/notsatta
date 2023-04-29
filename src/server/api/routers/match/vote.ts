import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs/server";

export const voteRouter = createTRPCRouter({
  putVote: protectedProcedure
    .input(z.object({ inpMatchId: z.string().length(5), voteTeam: z.number() }))
    .mutation(async ({ input, ctx: { auth, prisma } }) => {
      const roomId = (await clerkClient.users.getUser(auth.userId)).publicMetadata?.room as string
      if (!roomId) throw new TRPCError({ code: 'NOT_FOUND' })
      const cmatch = await prisma.cmatch.findFirst({
        where: {
          matchId: parseInt(input.inpMatchId),
          status: 'OPEN',
          roomId: roomId,
        }
      })

      if (!cmatch) throw new TRPCError({ code: 'NOT_FOUND' })
      const vote = await prisma.vote.findFirst({
        where: {
          userId: auth.userId,
          cmatchId: cmatch.id,
        },
      })
      if (vote) throw new TRPCError({ code: 'FORBIDDEN' })
      await prisma.vote.create({
        data: {
          cmatchId: cmatch.id,
          userId: auth.userId,
          teamId: input.voteTeam,
          roomId: roomId,
        }
      })
      return { success: true }
    })
})