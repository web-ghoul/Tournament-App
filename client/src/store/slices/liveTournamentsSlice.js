import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const getLiveTournaments = createAsyncThunk("liveTournaments/getTournaments",async()=>{
    const res =  await axios.get(process.env.REACT_APP_SERVER_URL+"/Tournaments")
    return res.data.data
})

const initialState = {
    isLiveTournamentsLoading:true,
    liveTournaments:null
}

const liveTournamentsSlice = createSlice({
    name:"liveTournaments",
    initialState,
    extraReducers:{
        [getLiveTournaments.pending]:(state,action)=>{
            state.isLiveTournamentsLoading = true
        },[getLiveTournaments.fulfilled]:(state,action)=>{
            state.liveTournaments = action.payload.reverse()
            state.isLiveTournamentsLoading = false
        },[getLiveTournaments.rejected]:(state,action)=>{
            state.isLiveTournamentsLoading = true
        },
    }
})

export default liveTournamentsSlice.reducer