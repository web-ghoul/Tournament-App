import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import scrollReducer from "./scrollSlice"

export const store = configureStore({
    reducer:{
        auth:authReducer,
        scroll:scrollReducer
    }
})