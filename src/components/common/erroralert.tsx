import type { FC } from 'react';

const ErrorAlert: FC<{
  errorMsg?: string | null;
  stateFunction?: (_state: boolean) => void;
}> = ({ errorMsg, stateFunction }) => {
  const errorMessage = errorMsg ? errorMsg : 'There was a problem.';
  return (
    <>
      <div
        onClick={() => {
          stateFunction?.(false);
        }}
        className='fixed bottom-12 left-1/2 flex w-max -translate-x-1/2 cursor-pointer select-none items-center justify-center  rounded-md bg-red-500 px-4 py-2 hover:bg-red-400'>
        <div className='flex items-center justify-center gap-3 rounded-md'>
          <svg
            className='h-4'
            fill='rgb(0, 0, 0)'
            version='1.1'
            id='Capa_1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 94.926 94.926'
            stroke='rgb(0, 0, 0)'
            transform='matrix(-1, 0, 0, -1, 0, 0)'>
            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
            <g
              id='SVGRepo_tracerCarrier'
              strokeLinecap='round'
              strokeLinejoin='round'></g>
            <g id='SVGRepo_iconCarrier'>
              <g>
                <path d='M55.931,47.463L94.306,9.09c0.826-0.827,0.826-2.167,0-2.994L88.833,0.62C88.436,0.224,87.896,0,87.335,0 c-0.562,0-1.101,0.224-1.498,0.62L47.463,38.994L9.089,0.62c-0.795-0.795-2.202-0.794-2.995,0L0.622,6.096 c-0.827,0.827-0.827,2.167,0,2.994l38.374,38.373L0.622,85.836c-0.827,0.827-0.827,2.167,0,2.994l5.473,5.476 c0.397,0.396,0.936,0.62,1.498,0.62s1.1-0.224,1.497-0.62l38.374-38.374l38.374,38.374c0.397,0.396,0.937,0.62,1.498,0.62 s1.101-0.224,1.498-0.62l5.473-5.476c0.826-0.827,0.826-2.167,0-2.994L55.931,47.463z'></path>{' '}
              </g>
            </g>
          </svg>
          <span>{errorMessage}</span>
        </div>
      </div>
    </>
  );
};

export default ErrorAlert;
