import type { FC } from 'react';
import { useEffect } from 'react';
import { useRef, useState } from 'react';

const MessageForm: FC<{
  callback: (text: string) => Promise<void>;
  UserName: string;
}> = ({ callback, UserName }) => {
  const [messageText, setMessageText] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // enter event handler
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (buttonRef !== null && buttonRef.current !== null) {
          buttonRef.current.click();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      // removes event listener on cleanup
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className='flex w-full'>
        <input
          placeholder={`Message @${UserName}`}
          ref={inputRef}
          minLength={1}
          maxLength={1000}
          className='input flex-1'
          onChange={(e) => {
            setMessageText(e.target.value.trim());
            e.target.value.trim().length < 1
              ? setDisableButton(true)
              : setDisableButton(false);
          }}></input>
        <button
          ref={buttonRef}
          disabled={disableButton}
          className='ml-3 rounded-full bg-themePrimary-50 p-2 opacity-100 disabled:cursor-not-allowed disabled:opacity-30 '
          onClick={async (e) => {
            e.preventDefault();
            if (inputRef !== null && inputRef.current !== null) {
              inputRef.current.value = '';
              setMessageText('');
              setDisableButton(true);
              await callback(messageText);
            }
          }}>
          <svg
            className='h-5 w-5 fill-themePrimary-300'
            viewBox='0 0 48 48'
            xmlns='http://www.w3.org/2000/svg'>
            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
            <g
              id='SVGRepo_tracerCarrier'
              strokeLinecap='round'
              strokeLinejoin='round'></g>
            <g id='SVGRepo_iconCarrier'>
              <g id='Layer_2' data-name='Layer 2'>
                <g id='invisible_box' data-name='invisible box'>
                  <rect width='20' height='20' fill='none'></rect>
                </g>
                <g id='icons_Q2' data-name='icons Q2'>
                  <path d='M44.9,23.2l-38-18L6,5A2,2,0,0,0,4,7L9.3,23H24a2.1,2.1,0,0,1,2,2,2,2,0,0,1-2,2H9.3L4,43a2,2,0,0,0,2,2l.9-.2,38-18A2,2,0,0,0,44.9,23.2Z'></path>
                </g>
              </g>
            </g>
          </svg>
        </button>
      </div>
    </>
  );
};

export default MessageForm;
