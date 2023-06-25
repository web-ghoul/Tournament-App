import React from 'react'
import MainSection from '../../components/MainSection/MainSection'
import Tournaments from '../../components/Tournaments/Tournaments'
import { Box } from '@mui/material'

const Home = () => {
  return (
    <Box>
      <MainSection/>
      <Tournaments/>
    </Box>
  )
}

export default Home
