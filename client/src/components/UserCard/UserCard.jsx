import React from 'react'

//Image
import userImg from "../../static/images/avatar.jpg"

//MUI
import { Box, Typography } from '@mui/material'

//Style
import styles from "./UserCard.module.css"

const UserCard = ({username, rating}) => {
  return (
    <Box className={`flex-between ${styles.user_card}`}>
      <Box className={`flex-start ${styles.user_avatar}`}>
        <Box className={`flex-center ${styles.avatar}`} >
            <Typography component="span" className='flex-center'></Typography>
            <Box component={"img"} src={userImg} alt="profile"/>
        </Box>
        <Box className={`grid-start ${styles.user_info}`}>
            <Typography variant='h3' className='game-font'>{username}</Typography>
            <Typography variant='h5' className='text-upper'>{rating} Rating</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default UserCard
