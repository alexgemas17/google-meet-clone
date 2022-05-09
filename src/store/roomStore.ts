import { useNavigate } from "react-router-dom";
import create from "zustand";
import { createRoom, loadRoom, saveRoom } from "../api/endpoints";
import { connect, Room as VideoRoom, } from 'twilio-video';
import { CreateRoomDto, LoadRoomDto } from "../Dtos/ContextData";

interface RoomStore {
    initRoom: boolean
    room: VideoRoom
    nameRoom: string;
    roomToken: string;
    roomUrl: string;
    setInfoRoom: (nameRoom: string, userName: string) => void;
    setNewRoom: (room: VideoRoom, userIdentity: string) => void;
    loadRoom: (url: string, userIdentity: string) => void;
    hangup: () => void;
}

export const roomStore = create<RoomStore>((set, get) => ({
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

    setNewRoom: (room: VideoRoom, userIdentity: string) => {
        saveRoom(get().nameRoom, userIdentity, get().roomUrl, room.sid)

        set((state) => ({
            ...state,
            room,
            initRoom: false
        }))
    },

    loadRoom: async (url: string, userIdentity: string) => {
        const roomDto: LoadRoomDto = await loadRoom(url, userIdentity)

        set((state) => ({
            ...state,
            nameRoom: roomDto.nameRoom,
            roomUrl: url,
            roomToken: roomDto.token,
            initRoom: true
        }))
    },

    hangup: () => {
        set((state) => ({
            ...state,
            nameRoom: '',
            roomToken: '',
            roomUrl: '',
            room: {} as VideoRoom,
        }))
    }
}));
