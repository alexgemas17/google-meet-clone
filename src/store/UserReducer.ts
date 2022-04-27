import { UserData } from "../Dtos/ContextData";
import { types } from "./types";

const initialState = {}

export const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.login:
            return {
                user: {
                    UID: action.payload.uid,
                    userName: action.payload.userName,
                    displayName: action.payload.displayName,
                    photoURL: action.payload.photoURL
                } as UserData
            }

        case types.logout:
           return {}
    
        default:
            return state;
    }
}