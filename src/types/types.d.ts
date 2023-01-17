import type { Chat, ChatsOnUsers, Message } from '@prisma/client';

type TypeChatList = Array<
  Chat & {
    messages: Message[];
    Users: (ChatsOnUsers & {
      user: {
        id: string;
        name: string;
        image: string;
      };
    })[];
  }
>;

type filterTypeChatList = Array<
  ChatsOnUsers & {
    user: { id: string; name: string; image: string };
  }
>;

type MessageStateList = Array<{
  status: number;
  foundChat: Chat & {
    messages: Message[];
    Users: (ChatsOnUsers & {
      user: {
        id: string;
        name: string;
        image: string;
      };
    })[];
  };
}>;

export { TypeChatList, filterTypeChatList, MessageStateList };
