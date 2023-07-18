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
export default authSlice.reducer