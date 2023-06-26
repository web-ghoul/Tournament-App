import { Box, Divider, Typography } from '@mui/material'
import gameImg from "../../static/images/game-img-1.png"
import styles from "./Tournament.module.css" 
import {MyButton} from "../MyButton/MyButton"
import HourglassFullOutlinedIcon from '@mui/icons-material/HourglassFullOutlined';
import React from 'react'

const Tournament = () => {
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
            <Typography variant="subtitle2" className='text-upper'>Players</Typography>
            <Typography variant="subtitle2" className='text-upper'>10 Credits</Typography>
          </Box>
          <Box className={`grid-center text-center  ${styles.border}`}>
            <Typography variant="subtitle2" className='text-upper'>Team Size</Typography>
            <Typography variant="subtitle2" className='text-upper'>2 Vs 2</Typography>
          </Box>
          <Box className={`grid-center text-center  ${styles.border}`}>
            <Typography variant="subtitle2" className='text-upper'>Max Teams</Typography>
            <Typography variant="subtitle2" className='text-upper'>64</Typography>
          </Box>
          <Box className={`grid-center text-center  ${styles.border}`}>
            <Typography variant="subtitle2" className='text-upper'>Enrolled</Typography>
            <Typography variant="subtitle2" className='text-upper'>11</Typography>
          </Box>
          <Box className={`grid-center text-center ${styles.border}`}>
            <Typography variant="subtitle2" className='text-upper'>Skill Level</Typography>
            <Typography variant="subtitle2" className='text-upper'>11</Typography>
          </Box>
        </Box>
      </Box>
      <Box className={`flex-center ${styles.btn}`}>
          <MyButton className='text-upper'>View Tournament</MyButton>
        </Box>
    </Box>
  )
}

export default Tournament
