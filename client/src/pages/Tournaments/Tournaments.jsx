import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import {MyBox} from "../../components/MyBox/MyBox"
import Tournament from '../../components/Tournament/Tournament'
import styles from "./Tournaments.module.css"

const Tournaments = () => {
  return (
    <MyBox className={styles.tournament_section} id="tournaments">
      <Container className={`grid-stretch ${styles.contain}`}>
        <Box className="grid-center">
          <Typography variant="h2" className='text-center game-font text-upper'>TOURNAMENTS</Typography>
          <Typography className={`text-center el-center-x ${styles.para}`} variant="subtitle1">Find the perfect tournaments for you. Head to head matches where you pick the game, rules and prize.</Typography>
        </Box>
        <Box className={`grid-center ${styles.tournaments}`}>
          <Tournament/>
          <Tournament/>
          <Tournament/>
        </Box>
      </Container>
    </MyBox>
  )
}

export default Tournaments
