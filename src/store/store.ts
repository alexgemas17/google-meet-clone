
import { User, UserCredential } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import create from "zustand";
import { loginUser } from "../api/endpoints";
import { UserLogout } from "../api/firebaseAuth";
import { UserData } from '../Dtos/ContextData';

const initialState = {
    UID: '',
    displayName: '',
    userName: '',
    photoURL: '',
    email: '',
} as UserData

interface UserState {
    userData: UserData;
    isLogged: boolean;
    doLogin: (userDto: User) => void;
    doLogout: () => void;
    setIsLogged: (isLogged: boolean) => void;
}

export const userStore = create<UserState>((set) => ({
    // initial state
    userData: initialState,
    isLogged: false,
    // methods for manipulating state
    doLogin: (user: User) => {
        console.log({user})

        const userData = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            UID: user.uid
        } as UserData

        set((state) => ({
            ...state,
            isLogged: true,
            userData: userData
        }))
    },
    doLogout: () => {
        UserLogout()
        set((state) => ({
            ...state,
            isLogged: false,
            userData: {} as UserData
        }))
    },
    setIsLogged: (isLogged: boolean) => {
        set((state) => ({
            ...state,
            isLogged
        }))
    },
}));