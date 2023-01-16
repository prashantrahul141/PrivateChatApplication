import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { prisma } from 'src/server/db';

export const mainRouter = createTRPCRouter({
  getChatList: protectedProcedure.query(async ({ ctx }) => {
    const data = await prisma.chat.findMany({
      where: {
        Users: { some: { userId: { equals: ctx.session.user.id } } },
      },
      include: {
        messages: {
          take: 1,
        },
        Users: {
          include: {
            user: true,
          },
        },
      },
    });

    if (data.length > 0) {
      return { status: 200, chatlist: data };
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
          messages: {
            take: 1,
          },
          Users: {
            include: {
              user: true,
            },
          },
        },
      });

      return { status: 201, createdChat };
    }),
});
