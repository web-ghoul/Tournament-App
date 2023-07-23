<<<<<<< HEAD
import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    token:null,
    username:null,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUserData:(state,action)=>{
            state.token =action.payload.token
            state.username =action.payload.username
        },
        logout:(state)=>{
            state.username = null
            state.token = null
        }
    }
})

export const {setUserData, logout} = authSlice.actions
=======
import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    token:null,
    username:null,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUserData:(state,action)=>{
            state.token =action.payload.token
            state.username =action.payload.username
        },
        logout:(state)=>{
            state.username = null
            state.token = null
        }
    }
})

export const {setUserData, logout} = authSlice.actions
>>>>>>> 212162d2f875d71fffb8130d5eff55f2d752d3ff
export default authSlice.reducer