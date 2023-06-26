import React from 'react'
import Box from '@mui/material/Box'
import Tournament from "../Tournament/Tournament"
import styles from "./TournamentSection.module.css"
import { Container, Typography } from '@mui/material'
import {MyBox} from "../MyBox/MyBox"

const TournamentSection = () => {
  return (
    <MyBox className={styles.tournament_section}>
      <Container className={`grid-stretch ${styles.contain}`}>
        <Box className="grid-center">
          <Typography variant="h2" className='text-center game-font text-upper'>BROWSE TOURNAMENTS</Typography>
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

export default TournamentSection
