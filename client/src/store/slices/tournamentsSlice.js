import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const getTournaments = createAsyncThunk("liveTournaments/getTournaments",async()=>{
    const res =  await axios.get(process.env.REACT_APP_SERVER_URL+"/Tournaments")
    return res.data.data
})

const initialState = {
    isTournamentsLoading:true,
    tournaments:null
}

const tournamentsSlice = createSlice({
    name:"tournaments",
    initialState,
    extraReducers:{
        [getTournaments.pending]:(state,action)=>{
            state.isTournamentsLoading = true
        },[getTournaments.fulfilled]:(state,action)=>{
            state.tournaments = action.payload.reverse()
            state.isTournamentsLoading = false
        },[getTournaments.rejected]:(state,action)=>{
            state.isTournamentsLoading = true
        },
    }
})

export default tournamentsSlice.reducer