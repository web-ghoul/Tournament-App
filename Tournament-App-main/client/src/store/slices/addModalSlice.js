import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    openTournamentModal:false,
    openAdminModal:false
}

const addModalSlice = createSlice({
    name:"addModal",
    initialState,
    reducers:{
        openAddTournamentModal:(state)=>{
            state.openTournamentModal = true
        },
        closeAddTournamentModal:(state)=>{
            state.openTournamentModal = false
        },
        openAddAdminModal:(state)=>{
            state.openAdminModal = true
        },
        closeAddAdminModal:(state)=>{
            state.openAdminModal = false
        }
    }
})

export const {openAddTournamentModal,openAddAdminModal,closeAddTournamentModal,closeAddAdminModal} =  addModalSlice.actions 
export default addModalSlice.reducer