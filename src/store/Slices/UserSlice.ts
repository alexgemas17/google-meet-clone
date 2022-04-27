import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserData } from '../../Dtos/ContextData'
import { RootState } from '../store'

const initialState: UserData = {
    UID: '',
    displayName: '',
    email: '',
    isLogged: false,
    photoURL: '',
    userName: '',
}

export const userSlice = createSlice({
    name: 'userData',
    initialState: initialState,
    reducers: {
        login: (state, action: PayloadAction<UserData>) => {
            state = action.payload
        },
        logout: (state, action: PayloadAction<UserData>) => {
            state = {} as UserData
        },
    },
})

export const { login, logout } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer