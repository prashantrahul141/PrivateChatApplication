import ErrorAlert from '@components/common/erroralert';
import Loading from '@components/common/loading';
import TopBar from '@components/common/topbar';
import ChatListSearch from '@components/forms/chatlistsearch';
import type { Chat } from '@prisma/client';
import { api } from '@utils/api';
import { useSession } from 'next-auth/react';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const ChatList: FC = () => {
  const querychatlist = api.main.getChatList.useQuery();
  const createChatMutation = api.main.createChat.useMutation();

  const { data: session } = useSession();
  const [showUserNotFoundError, setShowUserNotFoundError] = useState(false);
  const [chatList, setChatlist] = useState<Chat[]>([]);

  // initial load
  useEffect(() => {
    if (querychatlist.isSuccess && querychatlist.data.chatlist !== undefined) {
      setChatlist(querychatlist.data.chatlist);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [querychatlist.isFetched]);

  if (querychatlist.isFetched && querychatlist.data !== undefined) {
    // Call back function to create a new chat
    const createChat = ({ userId }: { userId: string }) => {
      if (userId === session?.user?.id) {
        setShowUserNotFoundError(true);
        return;
      }
      createChatMutation.mutate({ userId: userId });

      if (createChatMutation.isSuccess) {
        if (createChatMutation.data.status === 404) {
          setShowUserNotFoundError(true);
        } else if (
          createChatMutation.data.status === 201 &&
          createChatMutation.data.createdChat !== undefined
        ) {
          setShowUserNotFoundError(false);
          setChatlist([...chatList, createChatMutation.data.createdChat]);
        }
      }
    };
    if (chatList.length > 0) {
      return (
        <>
          <TopBar image={session?.user?.image}></TopBar>
          <div className='flex h-screen w-screen justify-center'>
            <div className='mt-24 h-max w-full max-w-xl border border-themePrimary-200/0'>
              <ChatListSearch createCallbackFunc={createChat}></ChatListSearch>

              {querychatlist.data.chatlist.map((_each_chat_item) => {
                return (
                  <div key={_each_chat_item.id} className='text-white'>
                    {_each_chat_item.id}
                  </div>
                );
              })}
            </div>
          </div>
          {showUserNotFoundError && (
            <ErrorAlert
              stateFunction={(_state: boolean) => {
                setShowUserNotFoundError(_state);
              }}
              errorMsg={`Couldn't find your friend :(`}></ErrorAlert>
          )}
        </>
      );
    } else if (chatList.length === 0) {
      return (
        <>
          <TopBar image={session?.user?.image}></TopBar>
          <div className='flex h-screen w-screen justify-center'>
            <div className='mt-24 h-max w-full max-w-xl border border-themePrimary-200/0'>
              <ChatListSearch createCallbackFunc={createChat}></ChatListSearch>
              <div className='mt-64 text-center sm:mt-52'>
                <span className='font-ubuntu text-themePrimary-50/90 text-themePrimary-50'>
                  You don&apos;t have any chats :/
                  <br /> Click on + icon to start a new chat.
                </span>
              </div>
            </div>
          </div>
        </>
      );
    }
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
