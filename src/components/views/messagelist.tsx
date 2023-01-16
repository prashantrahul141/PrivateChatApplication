import { api } from '@utils/api';
import type { FC } from 'react';

const MessageList: FC<{ chatid: string }> = ({ chatid }) => {
  const chat = api.main.getChat.useQuery({ chatid });
  return <></>;
};
export default MessageList;
