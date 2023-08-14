import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useParams } from 'react-router-dom';
import {useNavigate} from "react-router-dom"
import { getBrackets } from '../../store/slices/bracketsSlice';
import { getPoints } from '../../store/slices/pointsSlice';
import Confetti from 'react-confetti'

//Component
import Bracket from '../../components/Bracket/Bracket';
import BasicLoading from "../../components/BasicLoading/BasicLoading"
import Head from '../../components/Head/Head';
import Points from '../../components/Points/Points';
import RefreshButton from '../../components/RefreshButton/RefreshButton';

//MUI
import { Container, Skeleton } from '@mui/material'
import {MyBox} from "../../MUIComponents/MyBox/MyBox"

//Style
import styles from "./Tournament.module.css"


const Tournament = ({type}) => {
    const dispatch = useDispatch()
    const navigate= useNavigate()
    const {isBracketsLoading, max,brackets,tournament,winner} = useSelector((state)=>state.brackets)
    const {isPointsLoading, points,pointsWinner} = useSelector((state)=>state.points)
    const {tournamentId} = useParams()
    const {username} = useSelector((state)=>state.auth)
    const width = window.width
    const height = window.height

    useEffect(()=>{
        if(type === "Points"){
            dispatch(getPoints(tournamentId))
        }else{
            dispatch(getBrackets(tournamentId))
        }
    },[dispatch,navigate, tournamentId , type])

    return (
        <MyBox className={`${styles.graph}`}>
            <RefreshButton type={type}/>
            {
                (type === "Points" && isPointsLoading) || (type === "Brackets" && isBracketsLoading) ?
                (
                    <Container>
                        <BasicLoading>
                            <Skeleton variant='text' />
                            <Skeleton variant='text' />
                        </BasicLoading>
                    </Container>
                )
                :(
                    <>
                        {
                            ((type === "Points" && pointsWinner !== "*" && pointsWinner === username) || (type === "Brackets" &&winner !== "*" && username === winner)) &&  (
                                <Confetti
                                    width={width}
                                    height={height}
                                />
                            )
                        }
                        <Container className={`grid-stretch ${styles.graph_contain}`}>
                            <Head h={"h2"} align={"center"} title={type === "Points" ? (points && points[0].tournamentID.Name):(tournament && tournament.Name)} description={type === "Points" ? (points && points[0].tournamentID.Description):(tournament && tournament.Description)}/>
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
                    </>
                )
            }
        </MyBox>
    )
}

export default Tournament