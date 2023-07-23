import React from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import {MyButton} from "../MyButton/MyButton"
import styles from "./UserCard.module.css"
import userImg from "../../static/images/avatar.jpg"
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';

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
      <Box className={`flex-end ${styles.message}`}>
        <MyButton>Message</MyButton>
        <IconButton>
            <PersonAddAlt1RoundedIcon/>
        </IconButton>
      </Box>
    </Box>
  )
}

export default UserCard
