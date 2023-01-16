import { signIn } from 'next-auth/react';
import type { FC } from 'react';

const SigninForm: FC = () => {
  return (
    <>
      <div className='w-full'>
        <div>
          <button
            onClick={() => {
              void signIn('github');
            }}
            className='btn-signin'>
            Github
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              void signIn('discord');
            }}
            className='btn-signin'>
            Discord
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              void signIn('google');
            }}
            className='btn-signin'>
            Google
          </button>
        </div>
      </div>
    </>
  );
};

export default SigninForm;
