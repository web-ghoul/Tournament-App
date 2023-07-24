import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import {handleToastMessage} from "../../App"

//Images
import gameImg from "../../static/images/game-img-1.png"

//MUI
import { Box, Divider, Typography } from '@mui/material'
import {HourglassFullOutlined} from '@mui/icons-material';
import {MyButton} from "../../MUIComponents/MyButton/MyButton"

//Style
import styles from "./Tournament.module.css" 

const Tournament = ({tournament}) => {
  const username = useSelector((state)=>state.auth.username)
  const navigate= useNavigate()
  const [exist , setExist] = useState(false)
  const calender = tournament.StartsAt.split("T")
  const [data , setData] = useState(tournament)
  const time = calender[1].split(".")[0] 
  const date = calender[0] 

  const handleJoin= async()=>{
    await axios.post(process.env.REACT_APP_SERVER_URL+`/JoinTournament/${tournament._id}`,{},{
      withCredentials:true
    }).then((res)=>{
      let d = JSON.parse(JSON.stringify(data))
      d.Players.push(username)
      setData(d)
      setExist(true)
      handleToastMessage(res.data.message,"s");
    }).catch((err)=>{
      handleToastMessage(err.response.data.message,"e");
    })
  }

  const handleEnter= async()=>{
    await axios.post(process.env.REACT_APP_SERVER_URL+`/EnterTournament/${tournament._id}`,{},{
      withCredentials:true
    }).then((res)=>{
      navigate(`../graph/${tournament._id}`)
      handleToastMessage(`Welcome ${username}`,"s");
    }).catch((err)=>{
      handleToastMessage(err.response.data.message,"e");
    })
  }
  
  useEffect(()=>{
    if(tournament.Players.includes(username)){
      setExist(true)
    }
  },[tournament , exist , username])
  
  return (
    <Box className={`flex-between ${styles.tournament}`}>
      <Box component="img" alt="tournament" src={gameImg}/>
      <Box className={`grid-center ${styles.title}`}>
        <Typography variant='h3' className='game-font text-upper'>{data.Name}</Typography>
        <Box className={`flex-start ${styles.timing}`}>
          <Box className="flex-center">
            <HourglassFullOutlined fontSize='small' className={styles.icon}/>
            <Typography variant='h5'>Starts in</Typography>
            <Typography variant='h5' className={styles.time}>{time}</Typography>
          </Box>
          <Box className="flex-center">
            <Typography className={styles.date} variant='h5'>{date}</Typography>
          </Box>
        </Box>  
        <Divider/>
        <Box className={`flex-start ${styles.info}`}>
          <Box className={`grid-center text-center  ${styles.border}`}>
            <Typography variant="subtitle2" className='text-upper'>Match Time</Typography>
            <Typography variant="subtitle2" className='text-upper'>{data.Time}</Typography>
          </Box>
          <Box className={`grid-center text-center  ${styles.border}`}>
            <Typography variant="subtitle2" className='text-upper'>Max Players</Typography>
            <Typography variant="subtitle2" className='text-upper'>{data.Max}</Typography>
          </Box>
          <Box className={`grid-center text-center  ${styles.border}`}>
            <Typography variant="subtitle2" className='text-upper'>Enrolled</Typography>
            <Typography variant="subtitle2" className='text-upper'>{data.Players.length}</Typography>
          </Box>
        </Box>
      </Box>
      <Box className={`flex-center ${styles.btn}`}>
          {
            exist ? (
              <MyButton className='text-upper' onClick={handleEnter}>Enter Tournament</MyButton>
            ):(
              <MyButton className='text-upper' onClick={handleJoin}>Join Tournament</MyButton>
            )
          }
      </Box>
    </Box>
  )
}

export default Tournament
