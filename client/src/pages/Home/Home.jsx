import React from 'react'
import MainSection from '../../components/MainSection/MainSection'
import TournamentSection from '../../components/TournamentSection/TournamentSection'
import { Box } from '@mui/material'

const Home = () => {
  return (
    <Box>
      <MainSection/>
      <TournamentSection/>
    </Box>
  )
}

export default Home
