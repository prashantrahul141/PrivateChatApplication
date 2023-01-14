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
    router.push('/').finally(() => {
      ('');
    });
  } else if (status === 'unauthenticated') {
    return (
      <>
        <HeadComp headTitle='Sign in'></HeadComp>
        <div className='flex h-screen w-screen items-center justify-center'>
          <div className='h-max w-full max-w-xl rounded border border-themePrimary-50/40 py-10 text-center'>
            <div className='mb-12'>
              <span className='font-ubuntu text-3xl tracking-wider text-themePrimary-50/80'>
                Sign in
              </span>
            </div>
            {/* Sign in form */}
            <div>
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
