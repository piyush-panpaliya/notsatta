import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs/server";

export const userRouter = createTRPCRouter({
  username: protectedProcedure
    .input(z.object({ username: z.string().min(2).max(15) }))
    .mutation(async ({ input,ctx:{auth,prisma} }) => {
      if((await clerkClient.users.getUser(auth.userId)).publicMetadata?.username) throw new TRPCError({ code: 'FORBIDDEN' })
      const user = await clerkClient.users.updateUserMetadata(auth.userId, { 
        publicMetadata: {
          username:input.username
        } 
      })
      await prisma.user.upsert({
        where: { id: user.id },
        update: { username: input.username },
        create: { id: auth.userId, username: user.publicMetadata.username as string }
      })
    }),
})