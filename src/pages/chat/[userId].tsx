import React from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import SocketProvider from '../../contexts/SocketContext';
import ChatBody from '../../components/Chat/ChatBody';
import ChatFooter from '../../components/Chat/ChatFooter';
import Header from '../../components/Header';

export default function RoomLayout() {
  const roomId = '1';
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
