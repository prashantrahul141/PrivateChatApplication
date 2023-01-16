import ErrorAlert from '@components/common/erroralert';
import Loading from '@components/common/loading';
import ChatListSearch from '@components/forms/chatlistsearch';
import type { Chat, ChatsOnUsers, Message, User } from '@prisma/client';
import { api } from '@utils/api';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
      messages: Message[];
      Users: (ChatsOnUsers & {
        user: User;
      })[];
    })[]
  >([]);

  const router = useRouter();

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
      } else if (createdChat.status === 200) {
        setShowUserNotFoundError(false);
        void router.push(
          `/chat/${createdChat.chatid ? createdChat.chatid : ''}`
        );
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
                  const thisChatLastMessage = _each_chat_item.messages[0];
                  const thisChatUser =
                    _each_chat_item.Users[0] || _each_chat_item.Users[1];
                  return (
                    <Link
                      href={`/chat/${_each_chat_item.id}`}
                      key={_each_chat_item.id}>
                      <div
                        className={`group mb-2 flex cursor-pointer items-center justify-center rounded-md border border-themePrimary-200/10 px-2 py-4 text-red-50 duration-75 ease-in-out hover:bg-baseBackground-400 ${
                          thisChatLastMessage?.seenByParticiapants
                            ? 'opacity-80'
                            : 'opacity-100'
                        } hover:opacity-100`}>
                        <div className='ml-2'>
                          <Image
                            className='h-16 w-16 rounded-full'
                            src={thisChatUser.user.image}
                            width={64}
                            height={64}
                            alt={thisChatUser.user.name}></Image>
                        </div>
                        <div className='ml-4 flex-auto'>
                          <div className=''>
                            <span className='font-ubuntu text-xl font-semibold tracking-wide'>
                              {thisChatUser.user.name}
                            </span>
                          </div>
                          <div>
                            <span className='tracking-wide0 font-ubuntu'>
                              {thisChatLastMessage
                                ? thisChatLastMessage.text.length > 30
                                  ? thisChatLastMessage.text.slice(0, 30) +
                                    '...'
                                  : thisChatLastMessage.text
                                : ''}
                            </span>
                          </div>
                        </div>
                        <div>
                          {thisChatLastMessage !== undefined &&
                            !thisChatLastMessage.seenByParticiapants && (
                              <div className='mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-themePrimary-400 text-base'>
                                1
                              </div>
                            )}
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
