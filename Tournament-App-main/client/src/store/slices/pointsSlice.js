import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const getPoints = createAsyncThunk("points/getPoints",async(args)=>{
    const res = await axios.post(process.env.REACT_APP_SERVER_URL+`/displayPoints/${args}`,{},{
        withCredentials:true
    })
    return res.data
})

const initialState = {
    isPointsLoading:true,
    points:null,
    currentRound:1,
    pointsWinner:null,
    tournament:null
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
            if(state.points.length > 0){
                state.pointsWinner = state.points[0].tournamentID.Winner
            }
        },[getPoints.rejected]:(state,action)=>{
            state.isPointsLoading = true
        }
    }
})

export default pointsSlice.reducer