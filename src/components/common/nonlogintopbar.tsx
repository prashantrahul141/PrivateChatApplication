import Link from 'next/link';

const NonLoginTopBar = () => {
  return (
    <>
      <div className='fixed left-0 top-0 flex h-12 w-screen justify-center border-b border-b-themePrimary-100/20 backdrop-blur-lg '>
        <div className='flex h-full w-full max-w-7xl'>
          <Link className='my-auto' href={'/'}>
            <span className='ml-4 font-righteous text-3xl text-themePrimary-300'>
              PCA
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NonLoginTopBar;
