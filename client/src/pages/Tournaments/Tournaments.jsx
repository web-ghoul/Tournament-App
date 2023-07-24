import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTournaments } from '../../store/tournamentsSlice'

//Component
import Tournament from '../../components/Tournament/Tournament'

//MUI
import { Box, Button, Container, MenuItem, TextField, Typography } from '@mui/material'
import {MyBox} from "../../MUIComponents/MyBox/MyBox"

//Style
import styles from "./Tournaments.module.css"
import Head from '../../components/Head/Head'
import { useTheme } from '@emotion/react'

const Tournaments = () => {

  const dispatch = useDispatch()

  const {isLoading , tournaments} = useSelector((state)=>state.tournaments)

  useEffect(()=>{
    dispatch(getTournaments())
  },[dispatch])

  return (
    <MyBox className={styles.tournament_section} id="tournaments">
      <Container className={`grid-stretch ${styles.tournament_contain}`}>
          {
            isLoading ? (
              <>
                <Typography variant='h2' className='tac'>Loading...</Typography>
              </>
            )
            :
            (
              tournaments.length > 0 ? (
                <>
                  <Head title={"TOURNAMENTS"} description ={"Find the perfect tournaments for you. Head to head matches where you pick the game, rules and prize."}/>
                  {/* <Box className={`grid-stretch ${styles.filter}`}>
                    <Typography variant='h4'>Filter By :</Typography>                    
                    <Box className={`flex-start ${styles.filter_fields}`}>
                      <TextField onChange={(e)=>handleFilterName(e.target.value)} id="name" label="Name" variant="outlined" />
                      <TextField onChange={""} id="max" type='number' label="Maximum Number" variant="outlined" />
                      <TextField onChange={""} id="enrolled" type='number' label="Enrolled Number" variant="outlined" />
                      <TextField onChange={""} id="date" type='date' label="" variant="outlined" />
                    </Box>
                    <Box className={`flex-start ${styles.filter_buttons}`}>
                      <Button>Filter</Button>
                      <Button sx={{backgroundColor:theme.palette.error.main}}>Clear</Button>
                    </Box>
                  </Box> */}
                  <Box className={`grid-stretch ${styles.tournaments}`}>
                    {tournaments.map((d,i)=>{
                      return(
                        <Tournament key={i} tournament={d}/>
                      )
                    })}
                  </Box>
                </>
              )
              :(
                <MyBox>
                  <Typography variant='h1' className='tac'>No Tournaments Found!..</Typography>
                </MyBox>
              )
            )
          }
      </Container>
    </MyBox>
  )
}

export default Tournaments
