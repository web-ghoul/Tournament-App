import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const getTournament = createAsyncThunk("tournaments/getTournament",async(args)=>{
    const res =  await axios.get(process.env.REACT_APP_SERVER_URL+`/Tournaments/${args}`)
    return res.data.data
})


const initialState = {
    isLoading:true,
    tournament:{}
}

const tournamentSlice = createSlice({
    name:"tournament",
    initialState,
    extraReducers:{
        [getTournament.pending]:(state,action)=>{
            state.isLoading = true
        },[getTournament.fulfilled]:(state,action)=>{
            state.isLoading = false
            state.tournaments = action.payload
            console.log(state.tournaments)
            state.tournaments.reverse()
        },[getTournament.rejected]:(state,action)=>{
            state.isLoading = true
        }
    }
})

export default tournamentSlice.reducer