import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import Avatar from 'react-avatar';
import { useSocket } from '../../contexts/SocketContext';
import { getUser } from '../../helpers/fetchers';
import { useAuth } from '../../hooks/useAuth';

export interface Imessage {
  from: string
  to: string
  message: string
  socketId: string
  time: string
}

function ChatBody(params: {from: string, to: string}) {
  const [typing, setTyping] = useState<string>('');
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Imessage[]>([]);
  const { socket } = useSocket();
  const router = useRouter();
  const { auth } = useAuth();
  const [user, setUser] = useState() as any;

  async function handleGetUser() {
    const { userID } = router.query;
    const response = userID
      ? await getUser(userID as string, auth?.accessToken)
      : {};
    setUser(response);
  }

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    handleGetUser();
  }, [router, auth]);

  useEffect(() => {
    if (!socket?.hasListeners('typingResponse')) {
      socket?.on('typingResponse', (data) => {
        setTyping(data);
      });
    }
    if (!socket?.hasListeners('messagesListResponse')) {
      socket?.on('messagesListResponse', (data) => {
        setMessages(data);
      });
    }
    if (!socket?.hasListeners('receiveMessage')) {
      socket?.on('receiveMessage', (data: Imessage) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });
    }
    socket?.emit('getMessages', params);
  }, [auth, router, socket]);

  if (!user?.firstName) return <div>Loading...</div>;

  return (
    <div className="basis-[85%] overflow-y-scroll p-5 w-full flex flex-col gap-2">
      {messages?.map((message: any, index: number) => (message.from === params.from ? (
        <div className="flex self-end" key={index}>
          <div className="flex justify-center items-center px-3 py-1 rounded-full rounded-br-none bg-primary">
            <p className="font-sans">{message.message}</p>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 self-start" key={index}>
          <div className="self-center">
            <Avatar
              name={user.firstName}
              round={true}
              size="30"
              className="text-sm"
              />
          </div>
          <div>
            <p className="pl-2 text-sm align-bottom">{user.firstName}</p>
            <div className="flex justify-center items-center px-3 py-1 bg-gray-200 rounded-full rounded-tl-none">
              <p className="font-sans">{message.message}</p>
            </div>
            <p className="py-2 pl-2 text-xs font-light">
              {new Date(message.time).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      )))}
      <div ref={lastMessageRef} className="mt-auto text-slate-500">
        {typing}
      </div>
    </div>
  );
}

export default ChatBody;
