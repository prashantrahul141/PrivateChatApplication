import ErrorAlert from '@components/common/erroralert';
import Loading from '@components/common/loading';
import ChatListSearch from '@components/forms/chatlistsearch';
import type { Chat, ChatsOnUsers, User } from '@prisma/client';
import { api } from '@utils/api';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const ChatList: FC = () => {
  const querychatlist = api.main.getChatList.useQuery();
  const createChatMutation = api.main.createChat.useMutation();

  const { data: session } = useSession();
  const [showUserNotFoundError, setShowUserNotFoundError] = useState(false);
  const [chatList, setChatlist] = useState<
    (Chat & {
      Users: (ChatsOnUsers & {
        user: User;
      })[];
    })[]
  >([]);

  // initial load
  useEffect(() => {
    if (querychatlist.isSuccess && querychatlist.data.chatlist !== undefined) {
      setChatlist(querychatlist.data.chatlist);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [querychatlist.isFetched]);

  if (querychatlist.isFetched && querychatlist.data !== undefined) {
    // Call back function to create a new chat
    const createChat = async ({ userId }: { userId: string }) => {
      if (userId === session?.user?.id) {
        setShowUserNotFoundError(true);
        return;
      }
      const createdChat = await createChatMutation.mutateAsync({
        userId: userId,
      });

      if (createdChat.status === 404) {
        setShowUserNotFoundError(true);
      } else if (
        createdChat.status === 201 &&
        createdChat.createdChat !== undefined
      ) {
        setShowUserNotFoundError(false);
        setChatlist([...chatList, createdChat.createdChat]);
      }
    };
    return (
      <>
        <div className='mt-24 h-max w-full max-w-xl'>
          <ChatListSearch createCallbackFunc={createChat}></ChatListSearch>

          <div className='mt-8 h-full w-full border border-red-200/0'>
            {/* Chat list */}
            {chatList.length > 0 &&
              chatList.map((_each_chat_item) => {
                if (_each_chat_item.Users[1] !== undefined) {
                  return (
                    <Link
                      href={`/chat/${_each_chat_item.id}`}
                      key={_each_chat_item.Users[1].chatId}>
                      <div className='group flex cursor-pointer items-center justify-center rounded-md border border-themePrimary-200/10 px-2 py-4 text-red-50 duration-75 ease-in-out hover:bg-baseBackground-400'>
                        <div className='ml-2'>
                          <Image
                            className='h-16 w-16 rounded-full opacity-80 group-hover:opacity-100'
                            src={_each_chat_item.Users[1].user.image}
                            width={64}
                            height={64}
                            alt={_each_chat_item.Users[1].user.name}></Image>
                        </div>
                        <div className='ml-4 flex-auto'>
                          <div className=''>
                            <span className='font-ubuntu text-xl font-semibold tracking-wider text-themePrimary-50/80 group-hover:text-themePrimary-50'>
                              {_each_chat_item.Users[1].user.name}
                            </span>
                          </div>
                          <div>
                            <span className='font-ubuntu tracking-wide text-themePrimary-50/60 group-hover:text-themePrimary-50/90'>
                              {_each_chat_item.id}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                }
              })}
          </div>

          {/* chat list when no chats is available */}
          {chatList.length === 0 && (
            <div className='mt-64 text-center sm:mt-52'>
              <span className='font-ubuntu text-themePrimary-50/90 text-themePrimary-50'>
                You don&apos;t have any chats :/
                <br /> Click on + icon to start a new chat.
              </span>
            </div>
          )}
        </div>

        {/* Error alert */}
        {showUserNotFoundError && (
          <ErrorAlert
            stateFunction={(_state: boolean) => {
              setShowUserNotFoundError(_state);
            }}
            errorMsg={`Couldn't find your friend :(`}></ErrorAlert>
        )}
      </>
    );
  }

  return (
    <>
      <div className='flex h-full w-full items-center justify-center'>
        <Loading></Loading>
      </div>
    </>
  );
};

export default ChatList;
