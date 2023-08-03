import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const getPoints = createAsyncThunk("points/getPoints",async(args)=>{
    if(args.finished === "true"){
        const res = await axios.get(process.env.REACT_APP_SERVER_URL+`/DisplayFinishedTournamentsNode/${args.tournamentId}`,{},{
            withCredentials:true
        })
        return res.data.data
    }else{
        const res = await axios.post(process.env.REACT_APP_SERVER_URL+`/displayPoints/${args.tournamentId}`,{},{
            withCredentials:true
        })
        return res.data
    }
})

const initialState = {
    isPointsLoading:true,
    points:null,
    currentRound:null
}

const pointsSlice = createSlice({
    name:"points",
    initialState,
    extraReducers:{
        [getPoints.pending]:(state,action)=>{
            state.isPointsLoading = true
        },[getPoints.fulfilled]:(state,action)=>{
            state.isPointsLoading = false
            state.points = action.payload.data
            state.currentRound = action.payload.current_round
        },[getPoints.rejected]:(state,action)=>{
            state.isPointsLoading = true
        }
    }
})

export default pointsSlice.reducer