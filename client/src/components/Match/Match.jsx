import { Box } from '@mui/material'
import React from 'react'
import Card from '../Card/Card'
import styles from "./Match.module.css"

const Match = () => {
  return (
    <Box className={`grid-stretch ${styles.match}`}>
      <Card/>
      <Card/>
    </Box>
  )
}

export default Match
