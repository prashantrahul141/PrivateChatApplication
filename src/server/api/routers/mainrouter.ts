import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';

export const mainRouter = createTRPCRouter({
  sendMessage: protectedProcedure
    .input(z.object({ message: z.string() }))
    .query(({ input, ctx }) => {
      return { message: `created message ${input.message}` };
    }),
});
