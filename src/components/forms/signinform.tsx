import type { FC } from 'react';

const SigninForm: FC = () => {
  return (
    <>
      <div className='w-full'>
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
