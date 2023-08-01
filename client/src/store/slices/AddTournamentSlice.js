import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    openTournamentModal:false
}

const AddTournamentSlice = createSlice({
    name:"addTournament",
    initialState,
    reducers:{
        openAddTournamentModal:(state)=>{
            state.openTournamentModal = true
        },
        closeAddTournamentModal:(state)=>{
            state.openTournamentModal = false
        }
    }
})

export const {openAddTournamentModal,closeAddTournamentModal} =  AddTournamentSlice.actions 
export default AddTournamentSlice.reducer