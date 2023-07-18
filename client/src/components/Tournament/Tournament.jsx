import { Box, Divider, Typography } from '@mui/material'
import gameImg from "../../static/images/game-img-1.png"
import styles from "./Tournament.module.css" 
import {MyButton} from "../MyButton/MyButton"
import HourglassFullOutlinedIcon from '@mui/icons-material/HourglassFullOutlined';
import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import swal from "sweetalert2";
import axios from "axios"
import {useSelector} from "react-redux"

const Tournament = (props) => {
  // console.log(props)
  const username = useSelector((state)=>state.auth.username)
  const navigate= useNavigate()
  const [exist , setExist] = useState(false)
  const calender = props.data.StartsAt.split("T")
  const time = calender[1].split(".")[0] 
  const date = calender[0] 

  const handleJoin= async()=>{
    await axios.post(process.env.REACT_APP_SERVER_URL+`/JoinTournament/${props.data._id}`,{},{
      withCredentials:true
    }).then((res)=>{
      swal.fire({
        title: "Success",
        text: res.data.message && "",
        icon: "success",
      })
    }).catch((err)=>{
      swal.fire({
        title: "Error",
        text: err.response.data.message && "",
        icon: "error",
      })
    })
  }

  const handleEnter= async()=>{
    await axios.post(process.env.REACT_APP_SERVER_URL+`/EnterTournament/${props.data._id}`,{},{
      withCredentials:true
    }).then((res)=>{
      // swal.fire({
      //   title: "Success",
      //   text: res.data.message && "",
      //   icon: "success",
      // })
      navigate(`../graph/${props.data._id}`)
    }).catch((err)=>{
      console.log(err)
      swal.fire({
        title: "Error",
        text: err.response.data.message && "",
        icon: "error",
      })
    })
  }
  
  useEffect(()=>{
    if(props.data.Players.includes(username)){
      setExist(true)
    }
  },[props , exist,username])
  
  return (
    <Box className={`flex-center ${styles.tournament}`}>
      <Box component="img" alt="tournament" src={gameImg}/>
      <Box className={`grid-center ${styles.title}`}>
        <Typography variant='h3' className='game-font text-upper'>{props.data.Name}</Typography>
        <Box className={`flex-start ${styles.timing}`}>
          <Box className="flex-center">
            <HourglassFullOutlinedIcon fontSize='small' className={styles.icon}/>
            <Typography variant='h5'>Starts in</Typography>
            <Typography variant='h5' className={styles.time}>{time}</Typography>
          </Box>
          <Box className="flex-center">
            <Typography className={styles.date} variant='h5'>{date}</Typography>
          </Box>
        </Box>  
        <Divider/>
        <Box className={`flex-start ${styles.info}`}>
          {/* <Box className={`grid-center text-center  ${styles.border}`}>
            <Typography variant="subtitle2" className='text-upper'>Match Type</Typography>
            <Typography variant="subtitle2" className='text-upper'>{}</Typography>
          </Box> */}
          <Box className={`grid-center text-center  ${styles.border}`}>
            <Typography variant="subtitle2" className='text-upper'>Match Time</Typography>
            <Typography variant="subtitle2" className='text-upper'>{props.data.Time}</Typography>
          </Box>
          <Box className={`grid-center text-center  ${styles.border}`}>
            <Typography variant="subtitle2" className='text-upper'>Max Players</Typography>
            <Typography variant="subtitle2" className='text-upper'>{props.data.Max}</Typography>
          </Box>
          <Box className={`grid-center text-center  ${styles.border}`}>
            <Typography variant="subtitle2" className='text-upper'>Enrolled</Typography>
            <Typography variant="subtitle2" className='text-upper'>11</Typography>
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
