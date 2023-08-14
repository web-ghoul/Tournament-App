import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const getFinishedTournaments = createAsyncThunk("finishedTournaments/getTournaments",async()=>{
    const res =  await axios.get(process.env.REACT_APP_SERVER_URL+"/DisplayFinishedTournaments")
    return res.data.data
})

const initialState = {
    isFinishedTournamentsLoading:true,
    finishedTournaments:null,
}

const finishedTournamentsSlice = createSlice({
    name:"finishedTournaments",
    initialState,
    extraReducers:{
        [getFinishedTournaments.pending]:(state,action)=>{
            state.isFinishedTournamentsLoading = true
        },[getFinishedTournaments.fulfilled]:(state,action)=>{
            state.finishedTournaments = action.payload.reverse()
            state.isFinishedTournamentsLoading = false
        },[getFinishedTournaments.rejected]:(state,action)=>{
            state.isFinishedTournamentsLoading = true
        },
    }
})

export default finishedTournamentsSlice.reducer