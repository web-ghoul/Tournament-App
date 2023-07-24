import { Box, Typography } from '@mui/material'
import React from 'react'

import styles from './Head.module.css'

const Head = ({title,description}) => {
  return (
    <Box className={`grid-center ${styles.head}`}>
        <Typography variant="h2" className='text-center game-font text-upper'>{title}</Typography>
        <Typography className={`text-center el-center-x para`} variant="h6">{description}</Typography>
    </Box>
  )
}

export default Head
