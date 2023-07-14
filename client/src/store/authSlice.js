import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    token:null,
    username:null,
    data:null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUserData:(state,action)=>{
            state.token =action.payload.token
            state.username =action.payload.username
        },
        setData:(state,action)=>{
            state.data = action.payload.data
        },
        logout:(state)=>{
            state.username = null
            state.token = null
        }
    }
})

export const {setUserData,setData, logout} = authSlice.actions
export default authSlice.reducer