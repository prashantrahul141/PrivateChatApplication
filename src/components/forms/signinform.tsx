import type { FC } from 'react';

const SigninForm: FC = () => {
  return (
    <>
      <div className='w-full rounded bg-themePrimary-100/10'>
        <div>
          <button className='btn-signin'>Github</button>
        </div>
        <div>
          <button className='btn-signin'>Discord</button>
        </div>
        <div>
          <button className='btn-signin'>Google</button>
        </div>
      </div>
    </>
  );
};

export default SigninForm;
