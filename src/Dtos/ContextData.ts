export interface UserData {
    UID: string
    displayName: string,
    photoURL: string,
    email: string,
}

export interface UserContextData {
    userData: UserData
}

export interface CreateRoomDto {
    token: string,
    urlRoom: string
}

export interface LoadRoomDto {
    token: string,
    nameRoom: string
}