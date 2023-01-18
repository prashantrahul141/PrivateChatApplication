import Loading from '@components/common/loading';
import MessageForm from '@components/forms/messagesendform';
import type { Message } from '@prisma/client';
import { api } from '@utils/api';
import type { FC } from 'react';
import { useState } from 'react';
import EachMessageComponent from './eachmessagecomponent';
import Image from 'next/image';
import HeadComp from '@components/common/headcomponent';

const MessageList: FC<{ userId: string; chatid: string }> = ({
  userId,
  chatid,
}) => {
  const initalChatQuery = api.main.getInitialChat.useQuery({ chatid });
  const sendMessageMutation = api.main.sendMessage.useMutation();
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [participantInfo, setParticipantInfo] = useState<{
    name: string;
    image: string;
  }>({ name: 'Unknown', image: '/static/defaultavatar.png' });

  const getChatCallBack = () => {
    if (
      initalChatQuery.isSuccess &&
      initalChatQuery.data.foundChat !== undefined &&
      initalChatQuery.data.foundChat.Users[0] !== undefined
    ) {
      setMessages(initalChatQuery.data.foundChat.messages);
      setParticipantInfo({
        name: initalChatQuery.data.foundChat.Users[0].user.name,
        image: initalChatQuery.data.foundChat.Users[0].user.image,
      });
    }
  };

  // initial render
  setTimeout(getChatCallBack, 100);

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
      <div className='h-full w-full'>
        <HeadComp headTitle={participantInfo.name}></HeadComp>
        <div className='flex items-center justify-center rounded-t-md border-b border-b-black bg-baseBackground-400 py-2'>
          <Image
            className='ml-4 mr-4 rounded-full border border-themePrimary-300'
            src={participantInfo.image}
            alt={participantInfo.name}
            width={40}
            height={40}></Image>
          <span className='mr-auto font-righteous text-xl tracking-wider text-themePrimary-50'>
            {participantInfo.name}
          </span>
        </div>
        <div className='h-full'>
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
