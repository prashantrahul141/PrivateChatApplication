import type { FC } from 'react';
import HeadComp from '../common/headcomponent';
import Link from 'next/link';

const Welcome: FC = () => {
  return (
    <>
      <HeadComp></HeadComp>
      <div className='flex h-screen w-screen items-center justify-center '>
        <div className='h-max w-full max-w-xl text-center'>
          {/* title */}
          <div className=''>
            <span className='bg-gradient-to-r from-themePrimary-200 to-themePrimary-400 bg-clip-text font-righteous text-5xl tracking-wide text-transparent sm:text-6xl'>
              Private Chat
            </span>
          </div>

          {/* sub text */}
          <div className='mt-2'>
            <span className='font-ubuntu text-themePrimary-100/70'>
              Privacy while chatting? easy.
            </span>
          </div>

          {/* buttons */}
          <div className='mt-24 flex items-center justify-center '>
            <Link href='/signin' className='mx-3'>
              <button className='btn h-max w-max px-3 text-sm capitalize'>
                Sign up for free
              </button>
            </Link>
            <Link href={'/about'} className='mx-3'>
              <button className='btn  h-max w-max border border-themePrimary-300  bg-transparent px-3 text-sm  capitalize hover:bg-themePrimary-300/10'>
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Welcome;
