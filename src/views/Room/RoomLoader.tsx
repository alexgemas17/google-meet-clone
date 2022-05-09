import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import Video, { connect, Room as VideoRoom, } from 'twilio-video';
import io, { Socket } from 'socket.io-client';
import { roomStore } from '../../store/roomStore';
import { RoomManager } from './RoomManager';
import { userStore } from '../../store/userStore';

export const RoomLoader = () => {
    let { roomURL } = useParams();
    const navigate = useNavigate();
    const { initRoom, room, nameRoom, roomToken, setNewRoom, loadRoom } = roomStore()
    const { userData, isLogged } = userStore()

    console.log({initRoom})
    console.log({room})
    console.log({roomToken})
    console.log({roomURL})

    React.useEffect(() => {
        if (initRoom) {
            console.log('connecting!...', roomToken, nameRoom)
            Video.connect(roomToken, {
                name: nameRoom
            })
                .then((room) => {
                    console.log('connected! ', room)
                    setNewRoom(room, userData.displayName)
                })
        }
    }, [initRoom]);

    React.useEffect(() => {
        if (roomToken === '' && roomURL && Object.keys(room).length === 0) {
            loadRoom(roomURL, userData.displayName)
        }
    }, [roomToken, room]);

    if(!isLogged) {
        navigate("login/redirect/" + 'roomUrl')
    }

    return (
        <>
            {
                initRoom || Object.keys(room).length === 0 ? <span>Loading...</span> : <RoomManager/>
            }
        </>
    )
}
