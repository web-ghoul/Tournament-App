import React from 'react'
import {MyButton} from "../MyButton/MyButton"
import styles from "./MainSection.module.css"
import { Box , Container , Typography} from '@mui/material'
import verseImg from "../../static/images/versus.png"
import { MyBox } from '../MyBox/MyBox'

const MainSection = () => {
  return (
    <MyBox className={styles.main_section}>
      <Container className = {`grid-center text-center ${styles.contain_section}`}>
        <Typography variant='h4'  className='game-font text-upper'>Play Unlimited</Typography>
        <Typography variant='h1' className='game-font text-upper'>Tournaments</Typography>
        <Box className="flex-center">
            <MyButton>Get Started</MyButton>
        </Box>
        <Box className="flex-center image">
          <Box component="img" className={styles.image} alt="banner" src={verseImg}/>
        </Box>
      </Container>
    </MyBox>
  )
}

export default MainSection
