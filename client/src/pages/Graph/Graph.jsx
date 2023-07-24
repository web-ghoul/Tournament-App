import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useParams } from 'react-router-dom';
import { getNodes } from '../../store/nodesSlice';

//Component
import Bracket from '../../components/Bracket/Bracket';

//MUI
import { Container, Typography } from '@mui/material'
import {MyBox} from "../../MUIComponents/MyBox/MyBox"

//Style
import styles from "./Graph.module.css"

const Graph = () => {
    const dispatch = useDispatch()
    const {isLoading, max,nodes} = useSelector((state)=>state.nodes)
    const {tournamentId} = useParams()
    
    useEffect(()=>{
        dispatch(getNodes(tournamentId))
    },[dispatch , tournamentId])

    return (
        <MyBox className={`${styles.graph}`}>
            <Container className={`grid-stretch ${styles.graph_contain}`}>
                <Typography variant='h2' className={`tac`}>Tournament Graph</Typography>
                <Bracket nodes={nodes} max={max} isLoading={isLoading}/>
            </Container>
        </MyBox>
    )
}

export default Graph
