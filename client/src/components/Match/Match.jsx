import { Box } from '@mui/material'
import React from 'react'
import Card from '../Card/Card'
import styles from "./Match.module.css"
import { Bracket } from 'react-tournament-bracket'

const Match = ({game}) => {
  return (
    <Bracket game={game}/>
  )
}

export default Match
