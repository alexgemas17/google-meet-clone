import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserData } from '../Dtos/ContextData'
import type { AppThunk, RootState } from './store'

export interface AppState {
    isUserLogged: boolean,
    isLoading: boolean,
    userData: UserData
}

// Define the initial state using that type
const initialState: AppState = {
    isUserLogged: false,
    isLoading: false,
    userData: {} as UserData,
}

export const appSlice = createSlice({
    name: 'appData',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        login: (state, { payload }: PayloadAction<UserData>) => {
            state.userData = payload
        },
        logout: (state) => {
            state.userData = {} as UserData
        },
        setLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload
        },
    },
})

// export const getPhotos = (): AppThunk => {
//     return async dispatch => {
//         dispatch(setLoading(true))
//         try {
//             const baseURL: string = "https://api.nasa.gov/planetary/apod"
//             // your apiKey should ideally be in a .env file
//             const apiKey = "AIzaSyBDipCJKnoTuhByJP2pB4A7Fx4SAOXoy-k"

//             const res = await axios.get(
//                 `${baseURL}?api_key=${apiKey}&start_date=2020-05-07&end_date=2020-05-09`
//             )

//             dispatch(setLoading(false))
//             dispatch(setPhotos(res.data))
//         } catch (error) {
//             dispatch(setErrors(error))
//             dispatch(setLoading(false))
//         }
//     }
// }

export const { login, logout, setLoading } = appSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: { appState: AppState }) => state.appState.userData
export const isLoading = (state: { appState: AppState }) => state.appState.isLoading

export default appSlice.reducer