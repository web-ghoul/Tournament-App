import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import scrollReducer from "./scrollSlice"
import tournamentsReducer from "./tournamentsSlice"
import nodesReducer from "./nodesSlice"
import userReducer from './userSlice'

export const store = configureStore({
    reducer:{
        auth:authReducer,
        scroll:scrollReducer,
        tournaments:tournamentsReducer,
        nodes:nodesReducer,
        user:userReducer
    }
})