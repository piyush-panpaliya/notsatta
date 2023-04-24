import { type CreateNextContextOptions } from "@trpc/server/adapters/next";

import { prisma } from "~/server/db";

import { TRPCError, inferAsyncReturnType, initTRPC, } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { SignedInAuthObject, SignedOutAuthObject } from "@clerk/nextjs/dist/api";
import { getAuth } from "@clerk/nextjs/server";

interface AuthContext {
  auth: SignedInAuthObject | SignedOutAuthObject;
}

const createInnerTRPCContext = ({auth}: AuthContext) => {
  return {
    prisma,
    auth
  };
};

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  return await createInnerTRPCContext({auth: getAuth(opts.req)});
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      auth: ctx.auth,
      prisma: ctx.prisma,
    },
  })
})

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(isAuthed)

export type Context = inferAsyncReturnType<typeof createTRPCContext>
