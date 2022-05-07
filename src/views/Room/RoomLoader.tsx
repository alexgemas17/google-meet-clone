import React from 'react'
import { connect, Room as VideoRoom, } from 'twilio-video';
import io, { Socket } from 'socket.io-client';
import { roomStore } from '../../store/roomStore';
import { RoomManager } from './RoomManager';

export const RoomLoader = () => {
    const [socket, setSocket] = React.useState({} as Socket);
    const { initRoom, room, nameRoom, roomToken, setNewRoom } = roomStore()

    React.useEffect(() => {
        if (process.env.REACT_APP_SOCKET_URL) {
          const socket = io(process.env.REACT_APP_SOCKET_URL, { transports: ['websocket'] });
          console.log('sockeet!', socket)
          setSocket(socket);
        }
      }, []);

    React.useEffect(() => {
        if (initRoom) {
            console.log('connecting!...')
            connect(roomToken, {
                name: nameRoom,
                audio: true,
                video: { width: 640, height: 480 }
            })
                .then((room) => {
                    console.log('connected! ', room)
                    setNewRoom(room)
                })
        }
    }, [initRoom]);

    return (
        <>
            {
                initRoom && Object.keys(room).length === 0 ? <span>Loading...</span> : <RoomManager />
            }
        </>
    )
}
