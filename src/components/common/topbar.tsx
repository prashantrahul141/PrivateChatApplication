import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { useState } from 'react';

const TopBar: FC<{ image: string | null | undefined }> = ({ image }) => {
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  return (
    <>
      <div
        className='fixed left-0 top-0 flex h-12 w-screen justify-center border-b border-b-themePrimary-100/20 backdrop-blur-lg'
        onMouseLeave={() => {
          setShowOptionsMenu(false);
        }}>
        <div className='relative flex h-full w-full max-w-7xl'>
          {/* Icon */}
          <Link className='my-auto' href={'/'}>
            <span className='ml-4 font-righteous text-3xl text-themePrimary-300'>
              PCA
            </span>
          </Link>

          {/* User Avatar */}
          <div
            className='my-auto ml-auto mr-6 flex w-8 cursor-pointer'
            onClick={() => {
              setShowOptionsMenu(!showOptionsMenu);
            }}>
            <Image
              className='rounded-full'
              alt='Avatar'
              src={image ? image : '/static/defaultavatarimage.jpg'}
              width={50}
              height={50}></Image>
            <span className='my-auto text-[0.6rem] text-themePrimary-50'>
              &nbsp;&#9660;
            </span>
          </div>
          {/* Menu options */}
          {showOptionsMenu && (
            <>
              <div className='absolute right-9 top-11 w-max  rounded border border-themePrimary-200/50 bg-baseBackground-500/60 '>
                <Link href={'/'}>
                  <div className='navbar-menuitems mt-2'>Home</div>
                </Link>
                <Link href={'/settings'}>
                  <div className='navbar-menuitems'>Settings</div>
                </Link>
                <Link href={'/about'}>
                  <div className='navbar-menuitems'>About</div>
                </Link>
                <div
                  className='navbar-menuitems mb-2'
                  onClick={() => {
                    void signOut();
                  }}>
                  Sign out
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TopBar;
