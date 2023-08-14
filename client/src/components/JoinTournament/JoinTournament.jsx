import React, { useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { MyBox } from '../../MUIComponents/MyBox/MyBox'
import Head from '../../components/Head/Head'
import TournamentCard from '../TournamentCard/TournamentCard'
import { Container } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getTournament } from '../../store/slices/tournamentSlice'
import BasicLoading from '../BasicLoading/BasicLoading'

const JoinTournament = () => {
    const dispatch = useDispatch()
    const {tournamentId} = useParams()
    const {tournament, isTournamentLoading} = useSelector((state)=>state.tournament)

    useEffect(()=>{
        dispatch(getTournament(tournamentId))
    },[dispatch,tournamentId])
    
    return (
        <MyBox>
            <Container className={`grid-center`} sx={{gap:"30px"}}>
                <Head title="Join Tournament" align={"center"} h={"h2"}/>
                {
                    isTournamentLoading ?
                    (
                        <BasicLoading/>
                    )
                    :
                    (
                        <TournamentCard tournament={tournament} finished={false}/>
                    )
                }
            </Container>
        </MyBox>
    )
}

export default JoinTournament
