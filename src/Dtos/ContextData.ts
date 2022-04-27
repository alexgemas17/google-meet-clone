export interface UserData {
    isLogged: boolean
    UID: string
    displayName: string,
    userName: string,
    photoURL: string,
    email: string,
}

export interface ContextData {
    user: UserData
}

export const initalData: ContextData = {
    user: {} as UserData
}