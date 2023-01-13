import type { FC } from 'react';

const Loading: FC = () => {
  return (
    <>
      <div className='z-50 flex h-full w-full items-center justify-center bg-transparent'>
        <div className='h-6 w-6 animate-[spin_0.75s_ease-in-out_infinite] rounded-full border-4 border-themePrimary-1100/10 border-t-themePrimary-400'></div>
      </div>
    </>
  );
};

export default Loading;
