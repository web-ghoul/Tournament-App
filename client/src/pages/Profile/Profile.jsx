import React, {useEffect} from 'react'
import{useParams} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../../store/userSlice'

//Component
import UserCard from "../../components/UserCard/UserCard"
import GameStat from "../../components/GameStat/GameStat"

//MUI
import { Box,Container, Typography } from '@mui/material'
import {MyBox} from "../../MUIComponents/MyBox/MyBox"

//Style
import styles from "./Profile.module.css"

const Profile = () => {
  const dispatch= useDispatch()
  const {isLoading, userData} = useSelector((state)=>state.user)
  const {username} = useParams()

  useEffect(()=>{
    dispatch(getUserData(username))
  },[dispatch,username])

  return (
    <MyBox className={styles.profile_section}>
      {
        isLoading ? (
          <>
            <Typography variant='h3' className="tac">Loading...</Typography>
          </>
        ):
        (
          <>
            <Box className={`flex-center ${styles.background}`}>
              <Typography variant='h1' className={`game-font text-center`}>{userData.username}</Typography>
            </Box>
            <Container className={`grid-stretch ${styles.profile_contain}`}>
              <UserCard username={userData.username} rating = {userData.count.rated}/>
              <GameStat perfs={userData.perfs} count = {userData.count}/>
            </Container>
          </>
        )
      }
    </MyBox>
  )
}

export default Profile