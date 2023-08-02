import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useParams } from 'react-router-dom';
import { getBrackets } from '../../store/slices/bracketsSlice';
import { getPoints } from '../../store/slices/pointsSlice';

//Component
import Bracket from '../../components/Bracket/Bracket';

//MUI
import { Container } from '@mui/material'
import {MyBox} from "../../MUIComponents/MyBox/MyBox"

//Style
import styles from "./Tournament.module.css"
import Confetti from 'react-confetti'
import Head from '../../components/Head/Head';
import Points from '../../components/Points/Points';

const Tournament = ({type}) => {
    const dispatch = useDispatch()
    const {isBracketsLoading, max,brackets,tournament,winner} = useSelector((state)=>state.brackets)
    const {isPointsLoading, points} = useSelector((state)=>state.points)
    const {tournamentId, finished} = useParams()
    const {username} = useSelector((state)=>state.auth)
    const width = window.width
    const height = window.height
    useEffect(()=>{
        if(type === "Points"){
            dispatch(getPoints({tournamentId, finished}))
        }else{
            dispatch(getBrackets({tournamentId, finished}))
        }
    },[dispatch , tournamentId , type , finished])
    return (
        <MyBox className={`${styles.graph}`}>
            {
                winner && winner !== "*" && username === winner &&  (
                    <Confetti
                        width={width}
                        height={height}
                    />
                )
            }
            <Container className={`grid-stretch ${styles.graph_contain}`}>
                <Head h={"h1"} align={"center"} title={type === "Points" ? (points && points[0].tournamentID.Name):(tournament && tournament.Name)} description={type === "Points" ? (points && points[0].tournamentID.Description):(tournament && tournament.Description)}/>
                {
                    type === "Points"?
                    (
                        <Points isLoading={isPointsLoading} data={points}/>
                    ):
                    (
                        <Bracket nodes={brackets} max={max} isLoading={isBracketsLoading}/>
                    )
                }
                
            </Container>
        </MyBox>
    )
}

export default Tournament
