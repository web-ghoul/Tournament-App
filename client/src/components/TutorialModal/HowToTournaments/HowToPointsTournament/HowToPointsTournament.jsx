import React from 'react'
import {Box, List, ListItem, Typography} from "@mui/material"
import Head from "../../../Head/Head"
import styles from "../HowToTournaments.module.css"

import viewPointsTournamentImg from "../../../../static/images/viewPointsTournament.png"
import playerViewPointsTournamentImg from "../../../../static/images/playerViewPointsTournament.png"
import { useTheme } from '@emotion/react'

const HowToPointsTournament = () => {
  const theme = useTheme()
  return (
    <Box className={`grid-stretch ${styles.howToPointsTournament}`}>
      <Head line={true} h = {"h4"} align="left" title={"Points Tournament"}/>
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
          <Typography variant='h6' className={`tac`}>View of All Players</Typography>
          <Box component={"img"} alt="view of points tournament" src={viewPointsTournamentImg} />
        </Box>
        <Box className={"grid-center"}>
          <Typography variant='h6' className={`tac`}>View of a Player</Typography>
          <Box component={"img"} alt="player view of points tournament" src={playerViewPointsTournamentImg} />
        </Box>
      </Box>
    </Box>
  )
}

export default HowToPointsTournament
