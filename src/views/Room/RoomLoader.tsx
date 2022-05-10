import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import Video, { connect, Room as VideoRoom, } from 'twilio-video';
import io, { Socket } from 'socket.io-client';
import { roomStore } from '../../store/roomStore';
import { RoomManager } from './RoomManager';
import { userStore } from '../../store/userStore';

import './RoomManager.scss'
import { Typography } from '@mui/material';
import { LoadRoomDto } from '../../Dtos/ContextData';
import { loadRoomFromDb } from '../../api/endpoints';

export const RoomLoader = () => {
    let { roomURL } = useParams();
    const navigate = useNavigate();
    const { initRoom, room, nameRoom, roomToken, setNewRoom, loadRoom } = roomStore()
    const { userData } = userStore()
    const [errorSearching, setErrorSearching] = React.useState(false)

    console.log({initRoom})
    console.log({room})
    console.log({roomToken})
    console.log({roomURL})

    React.useEffect(() => {
      if(errorSearching){
        navigate('/')
      }
    }, [errorSearching])
    
    React.useEffect(() => {
        if (initRoom) {
            Video.connect(roomToken, {
                name: nameRoom
            })
                .then((room) => {
                    setNewRoom(room, userData.displayName)
                })
        }
    }, [initRoom]);

    const getRoom = async () => {
        let roomDto: LoadRoomDto = {} as LoadRoomDto
        try {
            roomDto = await loadRoomFromDb(roomURL ?? '', userData.displayName)
            loadRoom(roomDto, roomURL ?? '')
        } catch (error) {
            setErrorSearching(true)
        }
    }

    React.useEffect(() => {
        if (roomToken === '' && roomURL && Object.keys(room).length === 0) {
            getRoom()
        }
    }, [roomToken, room]);

    return (
        <>
            {
                initRoom || Object.keys(room).length === 0 ? <span className="room-manager-loading"><Typography color={'white'} variant="h5" component="h4">Loading...</Typography></span> : <RoomManager/>
            }
        </>
    )
}
