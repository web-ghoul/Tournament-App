import { Box, Skeleton } from '@mui/material'
import React from 'react'
import styles from "./BasicLoading.module.css"

const BasicLoading = ({children}) => {
  return (
    <Box className={`grid-stretch ${styles.loading}`}>
      {children}
      <Skeleton variant="rounded"/>
    </Box>
  )
}

export default BasicLoading
