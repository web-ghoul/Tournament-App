import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useNavigate, useParams } from 'react-router-dom'
import { getBrackets } from '../../../store/slices/bracketsSlice'
import axios from "axios"

//Component
import Arrow from '../Arrow/Arrow'

//MUI
import { Avatar, Box, Button, Divider, Typography } from '@mui/material'

//Images
import userImg from "../../../static/images/avatar.jpg"
import winnerImg from "../../../static/images/winner.png"

//Style
import styles from "./Match.module.css"
import { handleToastMessage } from '../../../App'

const Match = ({waiting1,waiting2 , match , last,dir ,h}) => {
  const {username} = useSelector((state)=>state.auth)
  const {tournament} = useSelector((state)=>state.brackets)
  const navigate = useNavigate()
  const {tournamentId} = useParams()
  const dispatch = useDispatch() 
  
  const handleEnterMatch = async()=>{
      await axios.post(process.env.REACT_APP_SERVER_URL+`/GameEntered/${match._id}`,{},{
        withCredentials:true
      }).then((res)=>{
        window.open(match.gameLink, "_blank")
      }).catch((err)=>{
        handleToastMessage(err.response.data.message, "e")
      })
  }

  const handleAbortGame = async() =>{
    await axios.post(process.env.REACT_APP_SERVER_URL+`/AbortMatch/${match.gameID}/${match._id}`,{},{withCredentials:true})
    .then((res)=>{
      dispatch(getBrackets(tournamentId))
    }).catch((err)=>{
      handleToastMessage(err.response.data.message,"e")
    })
  } 

  const handleEndGame = async() =>{
    await axios.post(process.env.REACT_APP_SERVER_URL + `/Node/${match.gameID}/${match._id}`,{},{withCredentials:true})
    .then((res)=>{
        dispatch(getBrackets(tournamentId))
    }).catch((err)=>{
      try{
        handleToastMessage(err.response.data.message,"e")
      }catch(error){
        handleToastMessage(error,"e")
      }
    })
  } 

  return (
    <Box className={`flex-center ${last && styles.last} ${waiting1 && waiting2 ? styles.wait_match_box:""} ${styles.match_box}`}>
      <Box className={`grid-stretch ${styles.match}`}>
        <Box onClick={()=>{match.hasOwnProperty("userName1") && navigate(`/profile/${match.userName1}`)}}  className={`flex-start ${match && match.hasOwnProperty("userName1") && username === match.userName1 ? styles.me: ""} ${styles.player}`}>
          <Avatar alt="webGhoul" src={!waiting1 && match.winner === match.userName1 ? winnerImg : userImg} />
          <Typography variant='h6'>{waiting1 ? "Waiting...":  match.userName1}</Typography>
        </Box>
        <Divider className={`${waiting1 && waiting2 ? styles.noDivider : styles.divider}`}/>
        <Box onClick={()=>{!waiting1 && navigate(`/profile/${match.userName2}`)}} className={`flex-start ${match && match.hasOwnProperty("userName2") && username === match.userName2 ? styles.me : ""} ${styles.player}`}>
          <Avatar alt="webGhoul" src={!waiting2 && match.winner === match.userName2 ? winnerImg : userImg} />
          <Typography variant='h6'>{waiting2 ? "Waiting...":  match.userName2}</Typography>
        </Box>
        <Box className={`grid-end ${styles.buttons}`}>
          {
            match && match.hasOwnProperty("userName1") && match.hasOwnProperty("userName2") && !waiting1 && !waiting2 && (
              <>
                <Button className={`${styles.match_button}`} onClick={handleEnterMatch}>Match</Button>
                {
                  (username === match.userName1 || username === match.userName2) && tournament && tournament.Players.includes(username) && match.winner === "*" && (
                    <>
                      <Button onClick={handleAbortGame} className={styles.abort_button}>Abort</Button>
                      <Button onClick={handleEndGame} className={styles.finish_button}>Finish</Button>
                    </>
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
