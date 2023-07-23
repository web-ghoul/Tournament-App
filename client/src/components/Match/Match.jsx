import { Avatar, Box, Button, Divider, Typography } from '@mui/material'
import React, { useState } from 'react'
import styles from "./Match.module.css"
// import { Bracket } from 'react-tournament-bracket'
import userImg from "../../static/images/avatar.jpg"
import Arrow from '../Arrow/Arrow'
import {useSelector} from "react-redux"
import winnerImg from "../../static/images/winner.png"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Match = ({waiting1,waiting2 , match , last,dir ,h}) => {
  const username = useSelector((state)=>state.auth.username)
  const navigate = useNavigate()

  const handleEndGame = async() =>{
    await axios.post(process.env.REACT_APP_SERVER_URL + `/Node/${match.gameID}/${match._id}`).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
  } 

  return (
    <Box className={`flex-center ${waiting1 && waiting2 ? styles.wait_match_box:""} ${styles.match_box}`}>
      <Box className={`grid-stretch ${styles.match}`}>
        <Box onClick={()=>{navigate(`/profile/${match.userName1}`)}}  className={`flex-start ${username === match.username1 ? styles.me: ""} ${styles.player}`}>
          <Avatar alt="webGhoul" src={userImg} />
          <Typography variant='h6'>{!match.hasOwnProperty("userName1") || waiting1 ? "Waiting...":  match.userName1}</Typography>
          {
            match.hasOwnProperty("userName1") && match.winner === match.username1 &&(
              <Box component={"img"} className={`${styles.winner_img}`} alt="winner" src={winnerImg}/>
            )
          }
        </Box>
        <Divider className={`${waiting1 && waiting2 ? styles.noDivider : styles.divider}`}/>
        <Box onClick={()=>{navigate(`/profile/${match.userName2}`)}} className={`flex-start ${username === match.userName2 ? styles.me : ""} ${styles.player}`}>
          <Avatar alt="webGhoul" src={userImg} />
          <Typography variant='h6'>{!match.hasOwnProperty("userName2") || waiting2 ? "Waiting...":  match.userName2}</Typography>
          {
            match.hasOwnProperty("userName2") && match.winner === match.userName2 && (
              <Box component={"img"}  className={`${styles.winner_img}`}  alt="winner" src={winnerImg}/>
            )
          }
        </Box>
        <Box className={`grid-end ${styles.buttons}`}>
          {
            match.hasOwnProperty("userName1") && match.hasOwnProperty("userName2") && !waiting1 && !waiting2 && (
              <>
                <Link target="_blank" to={match.gameLink}>
                  <Button className={`${styles.match_button}`}>Match</Button>
                </Link>
                {
                  match.winner === "*" && (
                    <Button onClick={handleEndGame}>Finish</Button>
                  )
                }
              </>
            )
          }
        </Box>
      </Box>
      {
        !last && (<Arrow dir={dir} h={h}/>)
      }
    </Box>
  )
}

export default Match
