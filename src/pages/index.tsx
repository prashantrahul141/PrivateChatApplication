import { type NextPage } from 'next';
import Loading from '@components/common/loading';
import { useSession } from 'next-auth/react';
import HeadComp from '@components/common/headcomponent';
import Welcome from '@components/home/welcome';

const Home: NextPage = () => {
  const { status } = useSession();

  if (status === 'authenticated') {
    return (
      <>
        <HeadComp headTitle='Home'></HeadComp>
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
      <Loading></Loading>
    </>
  );
};

export default Home;
