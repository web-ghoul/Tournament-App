import React from 'react'
import {MyButton} from "../MyButton/MyButton"
import styles from "./MainSection.module.css"
import { Box , Container , Typography} from '@mui/material'
import verseImg from "../../static/images/versus.png"
import { MyBox } from '../MyBox/MyBox'
import {useNavigate} from "react-router-dom"

const MainSection = () => {
  const navigate  = useNavigate()
  return (
    <MyBox className={styles.main_section}>
      <Container className = {`grid-center text-center ${styles.contain_section}`}>
        <Typography variant='h4'  className='game-font text-upper'>Play Unlimited</Typography>
        <Typography variant='h1' className='game-font text-upper'>Tournaments</Typography>
        <Box className="flex-center" sx={{zIndex:"1000" , position:"relative"}}>
            <MyButton  onClick={()=>navigate(process.env.REACT_APP_SIGNUP_PAGE)}>Get Started</MyButton>
        </Box>
        <Box className="flex-center image">
          <Box component="img" className={styles.image} alt="banner" src={verseImg}/>
        </Box>
      </Container>
    </MyBox>
  )
}

export default MainSection
