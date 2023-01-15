import type { FC } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

const ChatListSearch: FC<{
  createCallbackFunc: ({ userId }: { userId: string }) => Promise<void>;
}> = ({ createCallbackFunc }) => {
  const [showToolTip, setShowToolTip] = useState(false);
  const [showCreateChat, setShowCreateChat] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [createInputValue, setCreateInputValue] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const EXAMPLE_ID = 'clcxrnd720005vrroao5ys1ta';

  return (
    <>
      {/* form */}
      <div className='flex justify-center px-4 sm:px-0'>
        {/* search input */}
        <div className='mr-4 max-w-sm flex-auto'>
          <input className='input' placeholder='Search' type={'text'}></input>
        </div>

        {/* new chat button */}
        <div
          className='relative select-none'
          onMouseEnter={() => {
            setShowToolTip(true);
          }}
          onMouseLeave={() => {
            setShowToolTip(false);
          }}
          onClick={() => {
            setShowCreateChat(true);
          }}>
          <div className='btn flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-lg capitalize'>
            +
          </div>

          {/* button hover tool tip */}
          {showToolTip && (
            <div className='absolute -left-6 -bottom-8 flex h-max w-max rounded-md bg-themePrimary-100/80 p-1'>
              <span className='items-center justify-center px-1 font-ubuntu text-[0.65rem] text-themePrimary-1000'>
                Add new chat
              </span>
            </div>
          )}
        </div>
      </div>

      {/* create chat menu */}
      {showCreateChat && (
        <div
          onClick={(e) => {
            const divElement = e.target as HTMLDivElement;
            if (divElement.id === 'backdrop-id') {
              setShowCreateChat(false);
              setButtonDisabled(true);
            }
          }}
          id='backdrop-id'
          className='fixed top-0 left-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm backdrop-brightness-75'>
          <div className='h-max w-full max-w-lg rounded-md bg-baseBackground-400 p-4 py-7'>
            <div className='mb-8'>
              <span className='font-ubuntu text-lg text-themePrimary-50'>
                Create new chat
              </span>
            </div>
            <div className='mb-6'>
              <input
                onChange={() => {
                  if (inputRef !== null && inputRef.current !== null) {
                    setCreateInputValue(inputRef.current.value.trim());
                    setButtonDisabled(
                      inputRef.current.value.trim().length === 0
                    );
                  }
                }}
                ref={inputRef}
                className='input select-none'
                placeholder={`User ID. Eg: ${EXAMPLE_ID}`}></input>
            </div>
            <div className='flex items-center justify-center gap-3'>
              <div className='mr-auto'>
                <span className='ml-2 font-ubuntu text-base text-themePrimary-50/70'>
                  or send&nbsp;
                  <span
                    onClick={() => {
                      if (inputRef !== null && inputRef.current !== null) {
                        inputRef.current.value = EXAMPLE_ID;
                        setCreateInputValue(EXAMPLE_ID);
                        setButtonDisabled(
                          inputRef.current.value.trim().length === 0
                        );
                      }
                    }}
                    className='cursor-pointer text-themePrimary-300 underline'>
                    me!
                  </span>
                </span>
              </div>
              <div className='ml-auto'>
                <button
                  onClick={() => {
                    setShowCreateChat(false);
                    setButtonDisabled(true);
                  }}
                  className='btn-signin m-0 w-max bg-transparent px-2 font-ubuntu text-xs capitalize hover:bg-themePrimary-200/10 hover:text-themePrimary-50'>
                  Cancel
                </button>
              </div>
              <div>
                <button
                  disabled={buttonDisabled}
                  className='btn px-2 font-ubuntu text-xs capitalize'
                  onClick={async (e) => {
                    e.preventDefault();
                    setShowCreateChat(false);
                    await createCallbackFunc({ userId: createInputValue });
                  }}>
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatListSearch;
