import type { Chat, ChatsOnUsers, Message, User } from '@prisma/client';

type TypeChatList = Array<
  Chat & {
    messages: Message[];
    Users: (ChatsOnUsers & {
      user: User;
    })[];
  }
>;

export { TypeChatList };
