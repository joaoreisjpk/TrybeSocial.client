import React, { useEffect } from 'react';
import SocketProvider, { useSocket } from '../../contexts/SocketContext';
import ChatBody from '../../components/Chat/ChatBody';
import ChatFooter from '../../components/Chat/ChatFooter';

export default function RoomLayout() {
  const roomId = '1';
  const { socket, roomUsers } = useSocket();
  const username = 'João';

  useEffect(() => {
    console.log('chat has loaded');
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
      <div className="flex h-screen">
        <div className="flex relative flex-col w-full h-screen">
          <ChatBody roomId={roomId} />
          <ChatFooter roomId={roomId} />
        </div>
      </div>
    </SocketProvider>
  );
}
