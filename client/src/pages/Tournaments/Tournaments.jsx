import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLiveTournaments } from '../../store/slices/liveTournamentsSlice'
import { getFinishedTournaments } from '../../store/slices/finishedTournamentsSlice'

//Component
import TournamentCard from '../../components/TournamentCard/TournamentCard'

//MUI
import { Box, Container, IconButton,Skeleton,Typography } from '@mui/material'
import {MyBox} from "../../MUIComponents/MyBox/MyBox"
import {CheckCircleOutline,LiveTvRounded} from '@mui/icons-material';

//Style
import styles from "./Tournaments.module.css"
import Head from '../../components/Head/Head'

const Tournaments = () => {

  const dispatch = useDispatch()

  const [type,setType] = useState("live")

  const {isLiveTournamentsLoading , liveTournaments} = useSelector((state)=>state.liveTournaments)

  const {isFinishedTournamentsLoading , finishedTournaments} = useSelector((state)=>state.finishedTournaments)

  const loading = (
    <Box className={`grid-stretch ${styles.tournaments_loading}`}>
      <Skeleton variant="rounded"/>
      <Skeleton variant="rounded"/>
    </Box>
  )

  useEffect(()=>{
    dispatch(getLiveTournaments())
    dispatch(getFinishedTournaments())
  },[dispatch])
  
  return (
    <MyBox className={styles.tournament_section} id="tournaments">
      <Container className={`grid-stretch ${styles.tournament_contain}`}>
        <Head title={"TOURNAMENTS"} align={"center"} h={"h1"} description ={"Find the perfect tournaments for you. Head to head matches where you pick the game, rules and prize."}/>
        <Box className={`grid-center ${styles.tournaments_buttons}`}>
          <IconButton onClick={()=>setType("live")} className={`flex-center ${styles.live} ${type === "live" && styles.active}`}>
            <LiveTvRounded fontSize={"large"}/>
            <Typography variant="h5">Live Tournaments</Typography>
          </IconButton>
          <IconButton onClick={()=>setType("finish")} className={`flex-center ${styles.finish} ${type === "finish" && styles.active}`}>
            <CheckCircleOutline fontSize={"large"}/>
            <Typography variant="h5">Finished</Typography>
          </IconButton>
        </Box>
        <Box className={`grid-stretch ${styles.tournaments}`}>
        {
          type === "live"?
          (
            isLiveTournamentsLoading ? (
              loading
            ):(
              liveTournaments && liveTournaments.length > 0 ?
              liveTournaments.map((d,i)=>{
                if(d.Winner === "*"){
                  return(
                    <TournamentCard finished={false} key={i} tournament={d}/>
                  )
                }
              })
              :
              <MyBox>
                <Typography variant='h1' className='tac'>No Tournaments Found!..</Typography>
              </MyBox>
            )
          )
          :
          (
            isFinishedTournamentsLoading ? (
              loading
            ):(
              finishedTournaments && finishedTournaments.length > 0 ?
              finishedTournaments.map((d,i)=>{
                return(
                  <TournamentCard finished={true} key={i} tournament={d}/>
                )
              })
              :
              <MyBox>
                <Typography variant='h1' className='tac'>No Tournaments Found!..</Typography>
              </MyBox>
            )
          )
        }
        </Box>
      </Container>
    </MyBox>
  )
}

export default Tournaments
