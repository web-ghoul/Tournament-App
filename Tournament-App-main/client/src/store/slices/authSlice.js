import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    token:null,
    username:null,
    role:null,
    tutorial:null,
    signed:false
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUserData:(state,action)=>{
            state.token = action.payload.token
            state.username = action.payload.username
            state.role = action.payload.role
            state.tutorial = action.payload.tutorial
            state.signed = true
        },
        logout:(state)=>{
            state.username = null
            state.token = null
            state.signed = false
        }
    }
})

export const {setUserData, logout} = authSlice.actions
export default authSlice.reducer