import { useNavigate } from "react-router-dom";
import create from "zustand";
import { createRoom } from "../api/endpoints";
import { connect, Room as VideoRoom, } from 'twilio-video';
import { CreateRoomDto } from "../Dtos/ContextData";

interface RoomStore {
    room: VideoRoom
    nameRoom: string;
    roomUrl: string;
    createNewRoom: (nameRoom: string, userName: string) => void;
    hangup: () => void;
}

export const roomStore = create<RoomStore>((set) => ({
    // initial state
    nameRoom: '',
    roomUrl: '',
    room: {} as VideoRoom,
    createNewRoom: async (nameRoom: string, userName: string) => {
        const roomDto: CreateRoomDto = await createRoom(nameRoom, userName)
        console.log({roomDto})
        const room = await connect(roomDto.token, {
            name: nameRoom,
            audio: true,
            video: { width: 640, height: 480 }
        });

        set((state) => ({
            ...state,
            nameRoom: room.name,
            roomUrl: roomDto.urlRoom,
            room
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