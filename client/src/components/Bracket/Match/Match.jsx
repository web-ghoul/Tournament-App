import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getNodes } from '../../../store/nodesSlice'
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
  const username = useSelector((state)=>state.auth.username)
  const navigate = useNavigate()
  const {tournamentId} = useParams()
  const dispatch = useDispatch() 

  const handleEndGame = async() =>{
    await axios.post(process.env.REACT_APP_SERVER_URL + `/Node/${match.gameID}/${match._id}`,{},{withCredentials:true})
    .then((res)=>{
      dispatch(getNodes(tournamentId))
    }).catch((err)=>{
      handleToastMessage(err.response.data.message,"e")
    })
  } 

  return (
    <Box className={`flex-center ${last && styles.last} ${waiting1 && waiting2 ? styles.wait_match_box:""} ${styles.match_box}`}>
      <Box className={`grid-stretch ${styles.match}`}>
        <Box onClick={()=>{navigate(`/profile/${match.userName1}`)}}  className={`flex-start ${username === match.userName1 ? styles.me: ""} ${styles.player}`}>
          <Avatar alt="webGhoul" src={match.hasOwnProperty("userName1") && match.winner === match.userName1 ? winnerImg : userImg} />
          <Typography variant='h6'>{!match.hasOwnProperty("userName1") || waiting1 ? "Waiting...":  match.userName1}</Typography>
        </Box>
        <Divider className={`${waiting1 && waiting2 ? styles.noDivider : styles.divider}`}/>
        <Box onClick={()=>{navigate(`/profile/${match.userName2}`)}} className={`flex-start ${username === match.userName2 ? styles.me : ""} ${styles.player}`}>
          <Avatar alt="webGhoul" src={ match.hasOwnProperty("userName2") && match.winner === match.userName2 ? winnerImg : userImg} />
          <Typography variant='h6'>{!match.hasOwnProperty("userName2") || waiting2 ? "Waiting...":  match.userName2}</Typography>
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
