import { Box, List, ListItem, Typography, useTheme } from '@mui/material'
import React from 'react'
import Head from '../../../Head/Head'
import BracketsTournamentImg1 from "../../../../static/images/brackets1.png"
import BracketsTournamentImg2 from "../../../../static/images/brackets2.png"
import BracketsTournamentImg3 from "../../../../static/images/brackets3.png"
import styles from "../HowToTournaments.module.css"

const HowToBracketsTournament = () => {
  const theme = useTheme()
  return (
    <Box className={`grid-stretch ${styles.howToPointsTournament}`}>
      <Head line={true} h = {"h4"} align="left" title={"Brackets Tournament"}/>
      <List>
        <ListItem>
          <Typography variant='h5'>♟️ You should to set date of tournament in future and you should to set tournament name different from The Live Tournaments.</Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h5'>♟️ You should to set a number powered of 2 in 'Maximum Number of Players' Input</Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h5'>♟️ Make sure that your friends steady to join Tournament after you had created it</Typography>
        </ListItem>
        <ListItem>
          <Typography sx={{color:theme.palette.primary.main}} variant='h5'>♟️ Don't forgot to Enjoy. 😎</Typography>
        </ListItem>
      </List>
      <Box className={`flex-center  ${styles.images}`}>
        <Box className={"grid-center"}>
          <Typography variant='h6' className={`tac`}>Round 1</Typography>
          <Box component={"img"} alt="view of points tournament" src={BracketsTournamentImg1} />
        </Box>
        <Box className={"grid-center"}>
          <Typography variant='h6' className={`tac`}>Round 2</Typography>
          <Box component={"img"} alt="player view of points tournament" src={BracketsTournamentImg2} />
        </Box>
        <Box className={"grid-center"}>
          <Typography variant='h6' className={`tac`}>Winner</Typography>
          <Box component={"img"} alt="player view of points tournament" src={BracketsTournamentImg3} />
        </Box>
      </Box>
    </Box>
  )
}

export default HowToBracketsTournament
