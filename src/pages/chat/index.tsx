import React, { useEffect } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import SocketProvider, { useSocket } from '../../contexts/SocketContext';
import ChatBody from '../../components/Chat/ChatBody';
import ChatFooter from '../../components/Chat/ChatFooter';
import Header from '../../components/Header';

export default function RoomLayout() {
  const roomId = '1';
  const { socket, roomUsers } = useSocket();
  const username = 'João';

  useEffect(() => {
    if (roomUsers[roomId]?.includes(socket?.id)) return;
    socket?.emit('send_message', {
      text: `${username} joined the room.`,
      socketId: 'kurakani',
      roomId,
    });
    socket?.emit('join_room', roomId);
  }, []);
  return (
    <SocketProvider>
      <Head>
        <title>Home - Trybe Social</title>
        <meta name='description' content='Rede social focada nos trybers! Venha auxiliar nesse projeto super desafiador que é criar uma rede social, lá você terá liberdade de adicionar as fetures que quiser, desde que siga o padrão de código!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box height="100vh" display="flex" flexDirection="column" >
        <Header />
        <ChatBody roomId={roomId} />
        <ChatFooter roomId={roomId} />
      </Box>
    </SocketProvider>
  );
}
