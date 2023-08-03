import React, { useState } from 'react'
import {Box, IconButton, Skeleton, Typography} from "@mui/material"
import styles from "./Points.module.css"
import PointsTable from './PointsTable/PointsTable'
import PlayerTable from './PlayerTable/PlayerTable'
import { Streetview, ViewTimeline } from '@mui/icons-material'

const Points = ({isLoading, data}) => {
  console.log(data)
  const [pointsTable, setPointsTable] = useState(false)
  return (
    <Box className={`grid-stretch ${styles.match}`}> 
      <Box className={`grid-center ${styles.toggle_buttons}`}>
        <IconButton onClick={()=>setPointsTable(true)}  className={`flex-center ${pointsTable && styles.active}`}>
          <ViewTimeline/>
          <Typography variant='h5'>View</Typography>
        </IconButton>
        <IconButton onClick={()=>setPointsTable(false)} className={`flex-center ${!pointsTable && styles.active}`}>
          <Streetview/>
          <Typography variant='h5'>Your Table</Typography>
        </IconButton>
      </Box>
      {
        !data || isLoading?
        (
          pointsTable?
          (
            <Box className={`flex-center ${styles.points_loading}`}>
              <Skeleton variant='rounded'/>
            </Box>
          ):
          (
            <Box className={`flex-center ${styles.points_loading}`}>
              <Skeleton variant='rounded'/>
            </Box>
          )
        ):
        (
          pointsTable?
          (
            <PointsTable data={data}/>
          ):
          (
            <PlayerTable data={data}/>
          )
        )
      }
    </Box>
  )
}
export default Points
