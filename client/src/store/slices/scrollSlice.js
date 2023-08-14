import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    hide:true,
}

const scrollSlice = createSlice({
    name:"scroll",
    initialState,
    reducers:{
        hiding:(state)=>{
            state.hide = true
        },
        showing:(state)=>{
            state.hide = false
        }
    }
})

export const {hiding, showing} = scrollSlice.actions
export default scrollSlice.reducer