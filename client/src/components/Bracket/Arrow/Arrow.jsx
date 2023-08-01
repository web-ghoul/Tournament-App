import React from 'react'

//MUI
import { Box } from '@mui/material'

//Style
import styles from "./Arrow.module.css"

const Arrow = ({dir ,h}) => {
  return (
    <Box sx={{transform: dir==="top" ? `translateY(${h/2 + 3}px)`: `translateY(-${h/2+3}px)`}} className={`flex-center ${styles.arrow} ${dir === "top" ? styles.top : styles.bottom}`}>
        <Box sx={{height:`${h}px`}} className={`${styles.curve} ${styles.curve_1}`}></Box>
        <Box sx={{height:`${h}px`}} className={`${styles.curve} ${styles.curve_2}`}></Box>
    </Box>
  )
}

export default Arrow
