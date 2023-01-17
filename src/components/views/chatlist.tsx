import type { FC } from 'react';
import type { TypeChatList, filterTypeChatList } from 'src/types/types';
import ErrorAlert from '@components/common/erroralert';
import Loading from '@components/common/loading';
import ChatListSearch from '@components/forms/chatlistsearch';
import { api } from '@utils/api';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatList: FC<{ activatedChatId?: string }> = ({ activatedChatId }) => {
  const querychatlist = api.main.getChatList.useQuery();
  const createChatMutation = api.main.createChat.useMutation();
  const router = useRouter();

  const { data: session } = useSession();
  const [showUserNotFoundError, setShowUserNotFoundError] = useState(false);
  const [chatList, setChatlist] = useState<TypeChatList>([]);
  const [filterTerm, setFilterTerm] = useState('');

  const filterUser = (data: filterTypeChatList, avoidUserid: string) => {
    data.forEach((_each) => {
      if (_each.user.id !== avoidUserid) {
        return _each;
      }
    });
    return data[0] ? data[0] : data[1];
  };

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
        <div className='h-max w-full max-w-xl'>
          <ChatListSearch
            searchCallbackFun={({ _filterTerm }: { _filterTerm: string }) => {
              setFilterTerm(_filterTerm);
            }}
            createCallbackFunc={createChat}></ChatListSearch>

          <div className='mt-8 h-full w-full border border-red-200/0'>
            <AnimatePresence>
              {/* Chat list */}
              {chatList.length > 0 &&
                chatList.map((_each_chat_item) => {
                  const thisChatUser = filterUser(
                    _each_chat_item.Users,
                    session?.user?.id || '#'
                  );
                  if (
                    _each_chat_item.Users !== undefined &&
                    thisChatUser !== undefined &&
                    thisChatUser.user.name
                      .toLowerCase()
                      .includes(filterTerm.toLowerCase())
                  ) {
                    const thisChatLastMessage = _each_chat_item.messages[0];

                    return (
                      <Link
                        key={_each_chat_item.id}
                        href={`/chat/${_each_chat_item.id}`}>
                        <motion.div
                          className={`group mb-2 flex cursor-pointer items-center justify-center rounded-md border border-themePrimary-200/10 px-2 py-4 text-red-50 duration-75 ease-in-out ${
                            activatedChatId === _each_chat_item.id
                              ? 'bg-baseBackground-400'
                              : 'hover:bg-baseBackground-400'
                          } ${
                            thisChatLastMessage?.seenByParticiapants
                              ? 'opacity-80'
                              : 'opacity-100'
                          } hover:opacity-100`}
                          initial={{ opacity: 0, marginTop: 16 }}
                          animate={{ opacity: 1, marginTop: 0 }}
                          exit={{ opacity: 0, marginTop: 16 }}
                          transition={{ duration: 0.25, ease: 'easeIn' }}>
                          <div className='ml-2'>
                            <Image
                              className='h-16 w-16 rounded-full'
                              src={thisChatUser.user.image}
                              width={64}
                              priority={true}
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
                              <span className='font-ubuntu tracking-wide'>
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
                        </motion.div>
                      </Link>
                    );
                  }
                })}
            </AnimatePresence>
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
