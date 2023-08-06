import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useParams } from 'react-router-dom';
import {useNavigate} from "react-router-dom"
import { getBrackets } from '../../store/slices/bracketsSlice';
import { getPoints } from '../../store/slices/pointsSlice';

//Component
import Bracket from '../../components/Bracket/Bracket';
import BasicLoading from "../../components/BasicLoading/BasicLoading"

//MUI
import { Container,Skeleton } from '@mui/material'
import {MyBox} from "../../MUIComponents/MyBox/MyBox"

//Style
import styles from "./Tournament.module.css"
import Confetti from 'react-confetti'
import Head from '../../components/Head/Head';
import Points from '../../components/Points/Points';

const Tournament = ({type}) => {
    const {signed} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    const navigate= useNavigate()
    const {isBracketsLoading, max,brackets,tournament,winner} = useSelector((state)=>state.brackets)
    const {isPointsLoading, points,pointsWinner} = useSelector((state)=>state.points)
    const {tournamentId} = useParams()
    const {username} = useSelector((state)=>state.auth)
    const [width, setWidth] = useState(window.width)
    const [height,setHeight] = useState(window.height)
    window.onresize=()=>{
        setWidth(window.width)
        setHeight(window.height)
    }
    useEffect(()=>{
        if(!signed){
            navigate("/")
        }
        else{
            if(type === "Points"){
                dispatch(getPoints(tournamentId))
            }else{
                dispatch(getBrackets(tournamentId))
            }
        }
    },[dispatch,signed,navigate, tournamentId , type])

    return (
        <MyBox className={`${styles.graph}`}>
            {
                (type === "Points" && isPointsLoading) || (type === "Brackets" && isBracketsLoading) ?
                (
                    <BasicLoading>
                        <Skeleton variant="text"/>
                        <Skeleton variant="text"/>
                    </BasicLoading>
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