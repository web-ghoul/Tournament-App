<<<<<<< HEAD
import React from 'react'
import {MyButton} from "../MyButton/MyButton"
import styles from "./MainSection.module.css"
import { Box , Container , Typography} from '@mui/material'
import verseImg from "../../static/images/versus.png"
import { MyBox } from '../MyBox/MyBox'
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"

const MainSection = () => {
  const navigate  = useNavigate()
  const username = useSelector((state)=>state.auth.username)
  return (
    <MyBox className={styles.main_section}>
      <Container className = {`grid-center text-center ${styles.contain_section}`}>
        <Typography variant='h4'  className='game-font text-upper'>Play Unlimited</Typography>
        <Typography variant='h1' className='game-font text-upper'>Tournaments</Typography>
        <Box className="flex-center" sx={{zIndex:"1000" , position:"relative"}}>
        {
            
          username ?
          (
            <MyButton  onClick={()=>navigate(process.env.REACT_APP_TOURNAMENTS_PAGE)}>Let's Play</MyButton>
          )
            :
          (
            <MyButton  onClick={()=>navigate(process.env.REACT_APP_SIGNUP_PAGE)}>Get Started</MyButton>
          )
        }
        </Box>
        {/* <Box className="flex-center image">
          <Box component="img" className={styles.image} alt="banner" src={verseImg}/>
        </Box> */}
      </Container>
    </MyBox>
  )
}

export default MainSection
=======
import React from 'react'
import {MyButton} from "../MyButton/MyButton"
import styles from "./MainSection.module.css"
import { Box , Container , Typography} from '@mui/material'
import verseImg from "../../static/images/versus.png"
import { MyBox } from '../MyBox/MyBox'
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"

const MainSection = () => {
  const navigate  = useNavigate()
  const username = useSelector((state)=>state.auth.username)
  return (
    <MyBox className={styles.main_section}>
      <Container className = {`grid-center text-center ${styles.contain_section}`}>
        <Typography variant='h4'  className='game-font text-upper'>Play Unlimited</Typography>
        <Typography variant='h1' className='game-font text-upper'>Tournaments</Typography>
        <Box className="flex-center" sx={{zIndex:"1000" , position:"relative"}}>
        {
            
          username ?
          (
            <MyButton  onClick={()=>navigate(process.env.REACT_APP_TOURNAMENTS_PAGE)}>Let's Play</MyButton>
          )
            :
          (
            <MyButton  onClick={()=>navigate(process.env.REACT_APP_SIGNUP_PAGE)}>Get Started</MyButton>
          )
        }
        </Box>
        {/* <Box className="flex-center image">
          <Box component="img" className={styles.image} alt="banner" src={verseImg}/>
        </Box> */}
      </Container>
    </MyBox>
  )
}

export default MainSection
>>>>>>> 212162d2f875d71fffb8130d5eff55f2d752d3ff
