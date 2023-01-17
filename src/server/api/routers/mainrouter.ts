import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { prisma } from 'src/server/db';

export const mainRouter = createTRPCRouter({
  // returns the chat list of a user.
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
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (data.length > 0) {
      return { status: 200, chatlist: data };
    }
    return { status: 404 };
  }),

  // creates a new chat
  // returns the new created chat.
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

      const alreadyExisitingChat = await prisma.chat.findFirst({
        where: { Users: { some: { userId: { equals: input.userId } } } },
      });

      if (alreadyExisitingChat) {
        return {
          status: 200,
          chatid: alreadyExisitingChat.id,
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
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      });

      return { status: 201, createdChat };
    }),

  // returns messages for a chat
  // for initial load
  getInitialChat: protectedProcedure
    .input(z.object({ chatid: z.string() }))
    .query(async ({ ctx, input }) => {
      const foundChat = await prisma.chat.findUnique({
        where: {
          id: input.chatid,
        },
        include: {
          messages: true,
          Users: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      });

      if (!foundChat) {
        return { status: 404 };
      }
      let isAuthed = false;
      foundChat.Users.forEach((eachUser) => {
        if (eachUser.userId === ctx.session.user.id) {
          isAuthed = true;
        }
      });

      if (isAuthed) {
        return { status: 200, foundChat };
      }

      return { status: 403 };
    }),

  // creates a message in db
  // and returns it
  sendMessage: protectedProcedure
    .input(z.object({ text: z.string(), chatId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const foundChat = await prisma.chat.findUnique({
        where: {
          id: input.chatId,
        },
        include: {
          Users: {
            include: {
              user: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });
      if (!foundChat) {
        return { status: 403 };
      }

      let isAuthed = false;
      foundChat.Users.forEach((eachUser) => {
        if (eachUser.userId === ctx.session.user.id) {
          isAuthed = true;
        }
      });

      if (isAuthed) {
        const createdMessage = await prisma.message.create({
          data: {
            authorId: ctx.session.user.id,
            text: input.text,
            chatId: input.chatId,
          },
        });

        return { status: 201, createdMessage };
      }
      return { status: 403 };
    }),
});
