import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import scrollReducer from "./slices/scrollSlice"
import tournamentsReducer from "./slices/tournamentsSlice"
import bracketsReducer from "./slices/bracketsSlice"
import pointsReducer from "./slices/pointsSlice"
import userReducer from './slices/userSlice'
import addModalReducer from "./slices/addModalSlice"
import linksReducer from "./slices/linksSlice"
import tournamentTypeReducer from "./slices/tournamentTypeSlice"
import tournamentReducer from "./slices/tournamentSlice"

export const store = configureStore({
    reducer:{
        auth:authReducer,
        scroll:scrollReducer,
        tournaments:tournamentsReducer,
        brackets:bracketsReducer,
        points:pointsReducer,
        user:userReducer,
        addModal:addModalReducer,
        links:linksReducer,
        tournamentType:tournamentTypeReducer,
        tournament:tournamentReducer
    }
})