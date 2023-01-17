import type { Message } from '@prisma/client';
import type { FC } from 'react';

const EachMessageComponent: FC<{
  userId: string;
  _messages: Message[];
}> = ({ userId, _messages }) => {
  return (
    <div className='h-full overflow-x-hidden overflow-y-scroll bg-baseBackground-400'>
      {_messages.map((_each_message) => {
        const byAuthor = userId === _each_message.authorId;

        return (
          <div key={_each_message.id} className='flex w-full'>
            <div
              className={`my-1 w-max rounded-md px-2 py-2 ${
                byAuthor
                  ? 'ml-auto mr-3 bg-themePrimary-300'
                  : 'ml-2 bg-baseBackground-500'
              }`}>
              <span className='text-themePrimary-50'>{_each_message.text}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default EachMessageComponent;
