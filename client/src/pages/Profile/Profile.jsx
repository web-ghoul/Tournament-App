import React, {useEffect} from 'react'
import{useParams} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../../store/slices/userSlice'

//Component
import UserCard from "../../components/UserCard/UserCard"
import GameStat from "../../components/GameStat/GameStat"

//MUI
import { Box,Container, Skeleton, Typography } from '@mui/material'
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
      <>
        {
          isLoading ? (
            <Box>
              <Container className={`grid-stretch ${styles.profile_loading}`}>
                {/* <Typography variant='h3' className="tac">Loading...</Typography> */}
                <Skeleton className={`${styles.username_loading}`} variant="text"/>
                <Skeleton className={`${styles.avatar_loading}`}  variant="circular"/>
                <Skeleton className={`${styles.userCard_loading}`}  variant="rounded"/>
                <Skeleton className={`${styles.gameStat_loading}`}  variant="rounded"/>
              </Container>
            </Box>
          ):
          (
            <MyBox className={styles.profile_section}>
              <Box className={`flex-center ${styles.background}`}>
                <Typography variant='h1' className={`game-font text-center`}>{userData.username}</Typography>
              </Box>
              <Container className={`grid-stretch ${styles.profile_contain}`}>
                <UserCard username={userData.username} rating = {userData.count.rated}/>
                <GameStat perfs={userData.perfs} count = {userData.count}/>
              </Container>
            </MyBox>
          )
        }
      </>
  )
}

export default Profile