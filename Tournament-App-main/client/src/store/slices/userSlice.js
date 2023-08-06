import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const getUserData = createAsyncThunk("user/getUSerData",async(args)=>{
    const res =  await axios.get(`https://lichess.org/api/user/${args}`)
    return res.data
})

const initialState = {
    isLoading:true,
    userData:null,
}

const tournamentsSlice = createSlice({
    name:"user",
    initialState,
    extraReducers:{
        [getUserData.pending]:(state,action)=>{
            state.isLoading = true
        },[getUserData.fulfilled]:(state,action)=>{
            state.isLoading = false
            state.userData = action.payload
        },[getUserData.rejected]:(state,action)=>{
            state.isLoading = true
        }
    }
})

export default tournamentsSlice.reducer