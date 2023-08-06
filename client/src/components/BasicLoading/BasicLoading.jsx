import { Box, Skeleton } from '@mui/material'
import React from 'react'
import styles from "./BasicLoading.module.css"

const BasicLoading = () => {
  return (
    <Box className={`grid-stretch ${styles.loading}`}>
      <Skeleton variant="rounded"/>
    </Box>
  )
}

export default BasicLoading
