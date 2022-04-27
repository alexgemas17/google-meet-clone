import { Action, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { ThunkAction } from "redux-thunk"
import { UserData } from '../Dtos/ContextData';
import { appSlice } from './appSlices'

const reducer = {
    appSlice,
    // another reducers (if we have)
};

export const store = configureStore({reducer})

export type AppThunk = ThunkAction<void, UserData, unknown, Action<string>>;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
