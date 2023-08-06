import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {openAddTournamentModal} from "../../store/slices/addModalSlice"

//MUI
import { Box , Container , Typography} from '@mui/material'
import { MyBox } from '../../MUIComponents/MyBox/MyBox'
import {MyButton} from "../../MUIComponents/MyButton/MyButton"

//Style
import styles from "./Home.module.css"

const Home = () => {
  const navigate  = useNavigate()
  const dispatch = useDispatch()
  const username = useSelector((state)=>state.auth.username)
  return (
    <MyBox className={styles.main_section}>
      <Container className = {`grid-center text-center ${styles.contain_section}`}>
        <Typography variant='h1' className='game-font text-upper'>Tournaments</Typography>
        <Typography variant='h4'  className='game-font text-upper'>Play Unlimited</Typography>
        <Box className={`grid-center ${styles.home_buttons}`} sx={{zIndex:"1000" , position:"relative"}}>
          {
            username ?
            (
              <>
                <MyButton  onClick={()=>navigate(process.env.REACT_APP_TOURNAMENTS_PAGE)}>Let's Play</MyButton>
                
              </>
            )
              :
            (
              <MyButton onClick={()=>navigate(process.env.REACT_APP_SIGNUP_PAGE)}>Get Started</MyButton>
            )
          }
          <MyButton  onClick={()=>dispatch(openAddTournamentModal())}>Add Your Tournament</MyButton>
        </Box>
      </Container>
    </MyBox>
  )
}

export default Home
