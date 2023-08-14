import { RotateRight } from '@mui/icons-material'
import {MyButton} from "../../MUIComponents/MyButton/MyButton"
import React from 'react'
import styles from "./RefreshButton.module.css"
import { useDispatch } from 'react-redux'
import { getBrackets } from '../../store/slices/bracketsSlice'
import { getPoints } from '../../store/slices/pointsSlice'
import { useParams } from 'react-router-dom'
import { getTournaments } from '../../store/slices/tournamentsSlice'

const RefreshButton = ({type}) => {
    const dispatch =useDispatch()
    const {tournamentId} = useParams()
    const handleRefreshPage=()=>{
        if(type === "Points"){
            dispatch(getPoints(tournamentId))
        }else if(type === "Brackets"){
            dispatch(getBrackets(tournamentId))
        }else{
            dispatch(getTournaments())
        }
    }
    return (
        <MyButton onClick={handleRefreshPage} className={`flex-center ${styles.refresh_button}`}>
            <RotateRight/>
        </MyButton>
    )
}

export default RefreshButton
