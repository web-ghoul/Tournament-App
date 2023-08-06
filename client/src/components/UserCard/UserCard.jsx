import React from 'react'

//Image
import userImg from "../../static/images/avatar.jpg"

//MUI
import { Box, Typography } from '@mui/material'

//Style
import styles from "./UserCard.module.css"

const UserCard = ({username, rating}) => {
  return (
    <Box className={`flex-start ${styles.user_card}`}>
        <Box className={`flex-center ${styles.avatar}`} >
            <Box component={"img"} src={userImg} alt="profile"/>
        </Box>
        <Box className={`grid-start ${styles.user_info}`}>
            <Typography variant='h3' className='game-font'>{username}</Typography>
            <Typography variant='h5' className='text-upper'>{rating} Rating</Typography>
        </Box>
    </Box>
  )
}

export default UserCard
