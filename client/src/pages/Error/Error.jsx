import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import styles from "./Error.module.css" 
import {useNavigate} from "react-router-dom"
import { MyButton } from '../../components/MyButton/MyButton'
import { MyBox } from '../../components/MyBox/MyBox'

const Error = () => {
  const navigate = useNavigate()
  return (
    <Container className={`flex-center ${styles.error_section}`}>
      <MyBox className="grid-center text-center" gap={2}>
        <Typography variant="h1">WHOOPS..</Typography>
        <Typography variant="h5">PAGE NOT FOUND</Typography>
        <Box className="flex-center">
          <MyButton onClick={()=>navigate("/")}>Go Home</MyButton>
        </Box>
      </MyBox>
    </Container>
  )
}

export default Error
