import { User } from "firebase/auth"
import { Room as VideoRoom } from 'twilio-video';
import { CreateRoomDto, UserData } from "../Dtos/ContextData"

export const loginUser = async (user: User) => {
    fetch("http://localhost:5000/login/user", {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            DisplayName: user.displayName,
            ImgURL: user.photoURL,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
}

export const createRoom = async (nameRoom: string, userName: string): Promise<CreateRoomDto> => {
    return fetch("http://localhost:5000/room/createRoom", {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            nameRoom,
            userName
        }),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response: any) => {
        return response.json()
    })
}