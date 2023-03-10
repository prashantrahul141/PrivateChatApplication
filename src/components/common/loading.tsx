import type { FC } from 'react';

const Loading: FC = () => {
  // common loading component
  return (
    <>
      <div className='z-50 flex h-full w-full items-center justify-center bg-transparent'>
        <div className='h-5 w-5 animate-[spin_0.75s_ease-in-out_infinite] rounded-full border-4 border-themePrimary-200/30 border-t-themePrimary-400'></div>
      </div>
    </>
  );
};

export default Loading;
