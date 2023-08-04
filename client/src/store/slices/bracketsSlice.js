import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const getBrackets = createAsyncThunk("brackets/getBrackets",async(args)=>{
    const res = await axios.post(process.env.REACT_APP_SERVER_URL+`/displayGraph/${args}`,{},{
        withCredentials:true
    })
    return res.data.data
})

const initialState = {
    isBracketsLoading:true,
    brackets:[],
    max :null,
    winner:"*",
    tournament:{}
}

const bracketsSlice = createSlice({
    name:"brackets",
    initialState,
    extraReducers:{
        [getBrackets.pending]:(state,action)=>{
            state.isBracketsLoading = true
        },[getBrackets.fulfilled]:(state,action)=>{
            state.isBracketsLoading = false
            state.brackets = action.payload
            let c=0;
            let rounds = []
            state.brackets.map((d)=>(d.round === 1) && c++)
            state.max = c
            new Array(Math.log2(c*2)).fill(100).map(()=>rounds.push([]))
            state.brackets.map((d)=> (d.round-1 < rounds.length) && rounds[d.round-1].push(d))
            state.brackets = rounds
            if(rounds && rounds.length > 0){
                state.tournament = rounds[0][0].tournamentID
            }
            if(rounds[rounds.length-1].length > 0 && rounds[rounds.length-1][0].winner !== "*"){
                state.winner = rounds[rounds.length-1][0].winner
            }
        },[getBrackets.rejected]:(state,action)=>{
            state.isBracketsLoading = true
        }
    }
})

export default bracketsSlice.reducer