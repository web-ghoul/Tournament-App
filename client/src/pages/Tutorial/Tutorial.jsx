import React from 'react'
import {MyBox} from "../../MUIComponents/MyBox/MyBox"
import HowToAddTournament from '../../components/TutorialModal/HowToAddTournament/HowToAddTournament'
import Head from '../../components/Head/Head'
import { Container } from '@mui/material'
import styles from "./Tutorial.module.css"
import HowToPointsTournament from '../../components/TutorialModal/HowToTournaments/HowToPointsTournament/HowToPointsTournament'
import HowToBracketsTournament from '../../components/TutorialModal/HowToTournaments/HowToBracketsTournament/HowToBracketTournament'

const Tutorial = () => {
  return ( 
    <MyBox>
      <Container className={`grid-stretch ${styles.tutorial_contain}`}>
        <Head h={"h1"} align="center" title={"How To Play"}/>
        <HowToAddTournament/>
        <HowToPointsTournament/>
        <HowToBracketsTournament/>
      </Container>
    </MyBox>
  )
}

export default Tutorial
