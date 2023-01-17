import Loading from '@components/common/loading';
import MessageForm from '@components/forms/messagesendform';
import type { Message } from '@prisma/client';
import { api } from '@utils/api';
import type { FC } from 'react';
import { useState } from 'react';
import EachMessageComponent from './eachmessagecomponent';

const MessageList: FC<{ userId: string; chatid: string }> = ({
  userId,
  chatid,
}) => {
  const initalChatQuery = api.main.getInitialChat.useQuery({ chatid });
  const sendMessageMutation = api.main.sendMessage.useMutation();
  const [messages, setMessages] = useState<Array<Message>>([]);

  // initial data load.
  useState(() => {
    if (
      initalChatQuery.isSuccess &&
      initalChatQuery.data.foundChat !== undefined
    ) {
      setMessages(initalChatQuery.data.foundChat.messages);
    }
    // @ts-ignore
  }, [initalChatQuery.isFetched]);

  if (
    initalChatQuery.isFetched &&
    initalChatQuery.data?.foundChat !== undefined
  ) {
    // call back function to create new chat

    const callback = async (text: string) => {
      const createdMessage = await sendMessageMutation.mutateAsync({
        chatId: chatid,
        text: text,
      });
      if (
        createdMessage.status === 201 &&
        createdMessage.createdMessage !== undefined
      ) {
        setMessages([...messages, createdMessage.createdMessage]);
      }
    };
    return (
      <div className='w-full'>
        <div>
          <EachMessageComponent
            userId={userId}
            _messages={messages}></EachMessageComponent>
        </div>
        <div>
          <MessageForm callback={callback} UserName='Prashant'></MessageForm>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='flex h-full w-full items-center justify-center'>
        <Loading></Loading>
      </div>
    </>
  );
};
export default MessageList;
