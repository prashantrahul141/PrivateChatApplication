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
        <HeadComp headTitle='sd'></HeadComp>
        <TopBar image={session.user?.image}></TopBar>
        <div className='flex h-screen w-screen items-center justify-center'>
          <div className='flex w-max border border-red-200'>
            <div className='hidden lg:block'>
              <ChatList></ChatList>
            </div>
            <div>
              <MessageList chatid={chatid}></MessageList>
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
