import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const getTournaments = createAsyncThunk("tournaments/getTournaments",async()=>{
    const res =  await axios.get(process.env.REACT_APP_SERVER_URL+"/Tournaments")
    return res.data.data
})

const initialState = {
    isLoading:true,
    tournaments:[]
}

const tournamentsSlice = createSlice({
    name:"tournaments",
    initialState,
    extraReducers:{
        [getTournaments.pending]:(state,action)=>{
            state.isLoading = true
        },[getTournaments.fulfilled]:(state,action)=>{
            state.isLoading = false
            state.tournaments = action.payload
            state.tournaments.reverse()
        },[getTournaments.rejected]:(state,action)=>{
            state.isLoading = true
        }
    }
})

export default tournamentsSlice.reducer