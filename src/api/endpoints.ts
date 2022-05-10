import { User } from "firebase/auth"
import { Room as VideoRoom } from 'twilio-video';
import { CreateRoomDto, LoadRoomDto, UserData } from "../Dtos/ContextData"

export const loginUser = async (user: User) => {
    fetch(process.env.REACT_APP_SOCKET_URL + "/login/user", {
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
    return fetch(process.env.REACT_APP_SOCKET_URL + "/room/createRoom", {
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

export const saveRoom = async (roomName: string, userIdentity: string, url: string, roomSID: string)=> {
    fetch(process.env.REACT_APP_SOCKET_URL + "/room/saveRoom", {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            roomName,
            userIdentity,
            url,
            roomSID
        }),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response: any) => {
        return response.json()
    })
}

export const loadRoomFromDb = async (url: string, userIdentity: string): Promise<LoadRoomDto> => {
    return fetch(process.env.REACT_APP_SOCKET_URL + "/room/loadRoom", {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            url,
            userIdentity
        }),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response: any) => {
        return response.json()
    })
}