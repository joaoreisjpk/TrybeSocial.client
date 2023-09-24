'use client';

import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import { io, Socket } from 'socket.io-client';
import ISocketContext from '../interfaces/ISocketContext';
import IMessage from '../interfaces/IMessage';

const intialData: ISocketContext = {
  socket: undefined,
  roomUsers: {},
  messages: {},
};
const socketConnection = io(process.env.URL!);
const SocketContext = createContext<ISocketContext>(intialData);

export function useSocket() {
  return useContext(SocketContext);
}

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [roomUsers, setRoomUsers] = useState({});
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<{ [key: string]: IMessage[] }>({});

  useEffect(() => {
    if (!socketConnection.hasListeners('receive_message')) {
      socketConnection.on('receive_message', (data: IMessage) => {
        setMessages((prev) => {
          const newMessages = { ...prev };
          newMessages[data.roomId] = [...(newMessages[data.roomId] ?? []), data];
          return newMessages;
        });
      });
    }
    if (!socketConnection.hasListeners('receive_message')) {
      socketConnection.on('receive_message', (data) => setRoomUsers(data));
    }
    console.log('socket', socket);
    setSocket(socketConnection);
  }, []);

  return (
    <SocketContext.Provider value={{ socket, roomUsers, messages }}>
      {children}
    </SocketContext.Provider>
  );
}
