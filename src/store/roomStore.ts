import { useNavigate } from "react-router-dom";
import create from "zustand";
import { createRoom } from "../api/endpoints";
import { connect, Room as VideoRoom, } from 'twilio-video';
import { CreateRoomDto } from "../Dtos/ContextData";

interface RoomStore {
    initRoom: boolean
    room: VideoRoom
    nameRoom: string;
    roomToken: string;
    roomUrl: string;
    setInfoRoom: (nameRoom: string, userName: string) => void;
    setNewRoom: (room: VideoRoom) => void;
    hangup: () => void;
}

export const roomStore = create<RoomStore>((set) => ({
    // initial state
    initRoom: false,
    nameRoom: '',
    roomToken: '',
    roomUrl: '',
    room: {} as VideoRoom,
    setInfoRoom: async (nameRoom: string, userName: string) => {
        const roomDto: CreateRoomDto = await createRoom(nameRoom, userName)
        console.log({ roomDto })

        set((state) => ({
            ...state,
            nameRoom: nameRoom,
            roomUrl: roomDto.urlRoom,
            roomToken: roomDto.token,
            initRoom: true
        }))
    },

    setNewRoom: (room: VideoRoom) => {
        set((state) => ({
            ...state,
            room,
            initRoom: false
        }))
    },

    hangup: () => {
        set((state) => ({
            ...state,
            nameRoom: '',
            room: {} as VideoRoom,
        }))
    }
}));