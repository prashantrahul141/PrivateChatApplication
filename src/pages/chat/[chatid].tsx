import HeadComp from '@components/common/headcomponent';
import Loading from '@components/common/loading';
import TopBar from '@components/common/topbar';
import ChatList from '@components/views/chatlist';
import MessageList from '@components/views/messagelist';
import type { NextPage, NextPageContext } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export const getServerSideProps = (context: NextPageContext) => {
  const { query } = context;
  const { chatid } = query;
  return {
    props: {
      chatid: chatid || '#',
    },
  };
};

const Chat: NextPage<{ chatid: string }> = ({ chatid }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'authenticated') {
    return (
      <>
        <HeadComp></HeadComp>
        <TopBar image={session.user?.image}></TopBar>
        <div className='flex h-screen w-screen items-center justify-center overflow-x-hidden overflow-y-hidden px-4 '>
          <div className='mt-32 flex w-full max-w-6xl gap-4 '>
            <div className='hidden flex-auto md:block'>
              <ChatList activatedChatId={chatid}></ChatList>
            </div>
            <div className='h-screen flex-auto pb-48'>
              <MessageList
                userId={session.user?.id ?? '#'}
                chatid={chatid}></MessageList>
            </div>
          </div>
        </div>
      </>
    );
  } else if (status === 'unauthenticated') {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push('/signin');
  }

  return (
    <>
      <Loading></Loading>
    </>
  );
};

export default Chat;
