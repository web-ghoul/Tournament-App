import { Box, Divider, Typography } from '@mui/material'
import gameImg from "../../static/images/game-img-1.png"
import styles from "./Tournament.module.css" 
import {MyButton} from "../MyButton/MyButton"
import HourglassFullOutlinedIcon from '@mui/icons-material/HourglassFullOutlined';
import React from 'react'
import {useNavigate} from "react-router-dom"

const Tournament = () => {
  const navigate= useNavigate()
  return (
    <Box className={`flex-center ${styles.tournament}`}>
      <Box component="img" alt="tournament" src={gameImg}/>
      <Box className={`grid-center ${styles.title}`}>
        <Typography variant='h3' className='game-font text-upper'>MIX IT MONDAYS - CARRY ONLY</Typography>
        <Box className={`flex-start ${styles.timing}`}>
          <Box className="flex-center">
            <HourglassFullOutlinedIcon fontSize='small' className={styles.icon}/>
            <Typography variant='h5'>Starts in</Typography>
            <Typography variant='h5' className={styles.time}>10d 2H 18M</Typography>
          </Box>
          <Box className="flex-center">
            <Typography className={styles.date} variant='h5'>Apr 21, 5:00 AM EDT</Typography>
          </Box>
        </Box>  
        <Divider/>
        <Box className={`flex-start ${styles.info}`}>
          <Box className={`grid-center text-center  ${styles.border}`}>
            <Typography variant="subtitle2" className='text-upper'>Match Type</Typography>
            <Typography variant="subtitle2" className='text-upper'>Normal</Typography>
          </Box>
          <Box className={`grid-center text-center  ${styles.border}`}>
            <Typography variant="subtitle2" className='text-upper'>Match Time</Typography>
            <Typography variant="subtitle2" className='text-upper'>Rapid</Typography>
          </Box>
          <Box className={`grid-center text-center  ${styles.border}`}>
            <Typography variant="subtitle2" className='text-upper'>Max Players</Typography>
            <Typography variant="subtitle2" className='text-upper'>64</Typography>
          </Box>
          <Box className={`grid-center text-center  ${styles.border}`}>
            <Typography variant="subtitle2" className='text-upper'>Enrolled</Typography>
            <Typography variant="subtitle2" className='text-upper'>11</Typography>
          </Box>
        </Box>
      </Box>
      <Box className={`flex-center ${styles.btn}`}>
          <MyButton className='text-upper' onClick={()=>navigate("/graph")}>View Tournament</MyButton>
      </Box>
    </Box>
  )
}

export default Tournament
