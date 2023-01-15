import { type NextPage } from 'next';
import Loading from '@components/common/loading';
import { useSession } from 'next-auth/react';
import HeadComp from '@components/common/headcomponent';
import Welcome from '@components/home/welcome';
import ChatList from '@components/views/chatlist';

const Home: NextPage = () => {
  const { status } = useSession();

  if (status === 'authenticated') {
    return (
      <>
        <HeadComp headTitle='Home'></HeadComp>
        <ChatList></ChatList>
      </>
    );
  } else if (status === 'unauthenticated') {
    return (
      <>
        <Welcome></Welcome>
      </>
    );
  }

  return (
    <>
      <div className=' flex h-screen w-screen items-center justify-center'>
        <Loading></Loading>
      </div>
    </>
  );
};

export default Home;
