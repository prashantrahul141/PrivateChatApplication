import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { prisma } from 'src/server/db';

export const mainRouter = createTRPCRouter({
  getChatList: protectedProcedure.query(async ({ ctx }) => {
    const data = await prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        Chats: {
          include: {
            chat: true,
            user: true,
          },
        },
      },
    });
    if (data) {
      return { status: 200, chatlist: data.Chats };
    }
    return { status: 404 };
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
        data: {
          Users: {
            create: [{ userId: foundUser.id }, { userId: ctx.session.user.id }],
          },
        },
        include: {
          Users: true,
        },
      });

      return { status: 201, createdChat };
    }),
});
