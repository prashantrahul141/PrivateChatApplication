import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { prisma } from 'src/server/db';

export const mainRouter = createTRPCRouter({
  getChatList: protectedProcedure.query(async ({ ctx }) => {
    const _chatlist = await prisma.chat.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return { chatlist: _chatlist };
  }),

  createChat: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const foundUser = await prisma.user.findUnique({
        where: {
          id: input.userId,
        },
      });

      if (foundUser === null) {
        return {
          status: 404,
        };
      }
      const createdChat = await prisma.chat.create({
        data: { userId: ctx.session.user.id, toUser: input.userId },
      });

      return { createdChat };
    }),
});
