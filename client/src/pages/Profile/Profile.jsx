import React, { useCallback, useEffect, useState } from 'react'
import styles from "./Profile.module.css" 
import { Box,Container, Typography } from '@mui/material'
import {MyBox} from "../../components/MyBox/MyBox"
import UserCard from "../../components/UserCard/UserCard"
import GameStat from "../../components/GameStat/GameStat"
import axios from "axios"
import{useNavigate} from "react-router-dom"
import swal from "sweetalert"
import { useSelector } from 'react-redux'

const Profile = () => {
  const {username} = useSelector((state)=>state.auth)
  const navigate = useNavigate()
  const [userData , setUserData] = useState(null)
  const getUserData = useCallback(
    async()=>{
      axios.get(`https://lichess.org/api/user/${username}`)
      .then((res)=>{
        if(res.data && res.data.id !== "null"){
          setUserData(res.data)
        }
      })
      .catch(()=>{
        swal({
          title: "Error",
          text: "User doesn't exist",
          icon: "error",
          dangerMode: true,
        })
        navigate("*")
      })
    },[username,navigate]
  )

  useEffect(()=>{
    getUserData()
  },[getUserData])

  if(!userData){
    return (
      <></>
    )
  }
  
  return (
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

export default Profile