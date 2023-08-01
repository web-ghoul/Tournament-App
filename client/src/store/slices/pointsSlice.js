import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const getPoints = createAsyncThunk("points/getPoints",async(args)=>{
    const res = await axios.post(process.env.REACT_APP_SERVER_URL+`/displayPoints/${args}`,{},{
        withCredentials:true
    })
    return res.data.data
})

const initialState = {
    isPointsLoading:true,
    points:null,
}

const pointsSlice = createSlice({
    name:"points",
    initialState,
    extraReducers:{
        [getPoints.pending]:(state,action)=>{
            state.isPointsLoading = true
        },[getPoints.fulfilled]:(state,action)=>{
            state.isPointsLoading = false
            state.points = action.payload
        },[getPoints.rejected]:(state,action)=>{
            state.isPointsLoading = true
        }
    }
})

export default pointsSlice.reducer