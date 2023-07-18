import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {MyBox} from "../../components/MyBox/MyBox"
import Tournament from '../../components/Tournament/Tournament'
import styles from "./Tournaments.module.css"
import axios from "axios"

const Tournaments = () => {

  const [data , setData] = useState([])

  const handleTournamentsData = async()=>{
    await axios.get(process.env.REACT_APP_SERVER_URL+"/Tournaments").then((res)=>{
      setData(res.data.data)
    }).catch(()=>{
      setData([])
    })
  }

  useEffect(()=>{
    handleTournamentsData()
  },[])
  return (
    <MyBox className={styles.tournament_section} id="tournaments">
      <Container className={`grid-stretch ${styles.contain}`}>
          {
            data && data.length > 0 ? (
              <>
                <Box className="grid-center">
                  <Typography variant="h2" className='text-center game-font text-upper'>TOURNAMENTS</Typography>
                  <Typography className={`text-center el-center-x ${styles.para}`} variant="subtitle1">Find the perfect tournaments for you. Head to head matches where you pick the game, rules and prize.</Typography>
                </Box>
                <Box className={`grid-center ${styles.tournaments}`}>
                  {data.map((d,i)=>{
                    return(
                      <Tournament key={i} data={d}/>
                    )
                  })}
                </Box>
              </>
            )
            :(
              <MyBox>
                <Typography variant='h1' className='tac'>No Tournaments Found!..</Typography>
              </MyBox>
            )
          }
      </Container>
    </MyBox>
  )
}

export default Tournaments
