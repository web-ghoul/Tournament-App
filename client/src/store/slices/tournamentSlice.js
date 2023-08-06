import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const getTournament = createAsyncThunk("tournament/getTournament",async(args)=>{
    const res =  await axios.get(process.env.REACT_APP_SERVER_URL+`/Tournaments/${args}`)
    return res.data.data
})


const initialState = {
    isTournamentLoading:true,
    tournament:null
}

const tournamentSlice = createSlice({
    name:"tournament",
    initialState,
    extraReducers:{
        [getTournament.pending]:(state,action)=>{
            state.isTournamentLoading = true
        },[getTournament.fulfilled]:(state,action)=>{
            state.isTournamentLoading = false
            console.log(action.payload)
            state.tournament = action.payload
        },[getTournament.rejected]:(state,action)=>{
            state.isTournamentLoading = true
        }
    }
})

export default tournamentSlice.reducer