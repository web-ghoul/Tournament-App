import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const getNodes = createAsyncThunk("nodes/getNodes",async(args)=>{
    const res = await axios.post(process.env.REACT_APP_SERVER_URL+`/displayGraph/${args}`,{},{
        withCredentials:true
    })
    return res.data.data
})

const initialState = {
    isLoading:true,
    nodes:[],
    max : 0,
}

const nodesSlice = createSlice({
    name:"nodes",
    initialState,
    extraReducers:{
        [getNodes.pending]:(state,action)=>{
            state.isLoading = true
        },[getNodes.fulfilled]:(state,action)=>{
            state.isLoading = false
            state.nodes = action.payload
            let c=0;
            let rounds = []
            state.nodes.map((d)=>(d.round === 1) && c++)
            state.max = c
            new Array(Math.log2(c*2)).fill(100).map(()=>rounds.push([]))
            state.nodes.map((d)=> (d.round-1 < rounds.length) && rounds[d.round-1].push(d))
            state.nodes = rounds
        },[getNodes.rejected]:(state,action)=>{
            state.isLoading = true
        }
    }
})

export default nodesSlice.reducer