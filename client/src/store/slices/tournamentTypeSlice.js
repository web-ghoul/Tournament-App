import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    type:null,
}

const tournamentTypeSlice = createSlice({
    name:"tournamentSlice",
    initialState,
    reducers:{
        bracketsType:(state)=>{
            state.type = "Brackets"
        },
        pointsType:(state)=>{
            state.type = "Points"
        }
    }
})

export const {bracketsType, pointsType} = tournamentTypeSlice.actions

export default tournamentTypeSlice.reducer