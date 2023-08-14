import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTournaments } from '../../store/slices/tournamentsSlice'

//Component
import TournamentCard from '../../components/TournamentCard/TournamentCard'
import Head from '../../components/Head/Head'
import BasicLoading from '../../components/BasicLoading/BasicLoading'
import RefreshButton from "../../components/RefreshButton/RefreshButton"

//MUI
import { Box, Container, IconButton,Typography } from '@mui/material'
import {MyBox} from "../../MUIComponents/MyBox/MyBox"
import {CheckCircleOutline,LiveTvRounded} from '@mui/icons-material';

//Style
import styles from "./Tournaments.module.css"


const Tournaments = () => {

  const dispatch = useDispatch()

  const [type,setType] = useState("live")

  const {isTournamentsLoading , tournaments} = useSelector((state)=>state.tournaments)

  const liveTournaments = []

  const finishedTournaments = []

  if(tournaments){
    tournaments.map((t)=>t.Winner === "*" ? liveTournaments.push(t):
    finishedTournaments.push(t))
  }

  useEffect(()=>{
    dispatch(getTournaments())
  },[dispatch])
  
  return (
    <MyBox className={styles.tournament_section} id="tournaments">
      <RefreshButton type="tournaments"/>
      <Container className={`grid-stretch ${styles.tournament_contain}`}>
        <Head title={"TOURNAMENTS"} align={"center"} h={"h2"} description ={"Find the perfect tournaments for you. Head to head matches where you pick the game, rules and prize."}/>
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
        {
          type === "live"?
          (
              isTournamentsLoading ? (
                <BasicLoading/>
              ):(
              <Box className={`grid-stretch ${styles.tournaments}`}>
                {
                  liveTournaments.length > 0?
                  liveTournaments.map((t,i)=>(
                    <TournamentCard key={i} tournament={t} finished={false} />
                  ))
                  :
                  (<MyBox>
                    <Typography variant='h1' className='tac'>No Tournaments Found!..</Typography>
                  </MyBox>)
                }
              </Box>
              )
          )
          :
          (
            isTournamentsLoading ? (
              <BasicLoading/>
            ):(
              finishedTournaments.length > 0?
              finishedTournaments.map((t,i)=>(
                <TournamentCard key={i} tournament={t} finished={true} />
              ))
              :
              (<MyBox>
                <Typography variant='h1' className='tac'>No Tournaments Found!..</Typography>
              </MyBox>)
            )
          )
        }
      </Container>
    </MyBox>
  )
}

export default Tournaments
