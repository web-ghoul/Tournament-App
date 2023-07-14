import React from 'react'
import { Typography,Box } from '@mui/material'
import styles from "./Card.module.css"

const Card = () => {
  return (
    <Box className={`flex-between ${styles.card}`}>
      <Typography variant='h5'>webGhoul</Typography>
      <Typography variant='h5'>33</Typography>
    </Box>
  )
}

export default Card
