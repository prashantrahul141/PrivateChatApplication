import HeadComp from '@components/common/headcomponent';
import Loading from '@components/common/loading';
import SigninForm from '@components/forms/signinform';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Signin: NextPage = () => {
  //  User Sign in page
  const { status } = useSession();
  const router = useRouter();

  if (status === 'authenticated') {
    router.push('/');
  } else if (status === 'unauthenticated') {
    return (
      <>
        <HeadComp headTitle='Sign in'></HeadComp>
        <div className='flex h-screen w-screen items-center justify-center'>
          <div className='m-2 flex h-max w-full max-w-7xl flex-grow items-center rounded bg-themePrimary-300/10 p-2 text-center  backdrop-blur-sm'>
            <div className='hidden flex-auto font-righteous text-6xl sm:block'>
              Welcome
            </div>
            <div className='flex flex-auto'>
              <SigninForm></SigninForm>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Loading></Loading>
    </>
  );
};

export default Signin;
