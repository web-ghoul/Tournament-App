import React, { useEffect, useState } from 'react'
import styles from "./Profile.module.css" 
import { Box,Container, Typography } from '@mui/material'
import {MyBox} from "../../components/MyBox/MyBox"
import UserCard from "../../components/UserCard/UserCard"
import GameStat from "../../components/GameStat/GameStat"
import axios from "axios"
import{useNavigate, useParams} from "react-router-dom"
import swal from "sweetalert"

const Profile = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [userData , setUserData] = useState(null)
  
  const getUserData = async()=>{
    axios.get(`https://lichess.org/api/user/${id}`)
    .then((res)=>{
      setUserData(res.data)
    })
    .catch(()=>{
      swal({
        title: "Error",
        text: "User doesn't exist",
        icon: "Error",
        dangerMode: true,
      })
      navigate("*")
    })
  }

  useEffect(()=>{
    getUserData()
  },[])

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