import React, { useState } from 'react'
import {Box, IconButton, Skeleton, Typography} from "@mui/material"
import styles from "./Points.module.css"
import PointsTable from './PointsTable/PointsTable'
import PlayerTable from './PlayerTable/PlayerTable'
import { Streetview, ViewTimeline } from '@mui/icons-material'
import { useSelector } from 'react-redux'

const Points = ({isLoading, data}) => {
  const [pointsTable, setPointsTable] = useState(true)

  const {username} = useSelector((state)=>state.auth)

  const isUserJoined = data.filter((d)=>d.Name === username).length === 1

  return (
    <Box className={`grid-stretch ${styles.match}`}> 
      {
        isUserJoined && (
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
        )
      }
      {
        !data || isLoading?
        (
          isUserJoined ?
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
            <Box className={`flex-center ${styles.points_loading}`}>
              <Skeleton variant='rounded'/>
            </Box>
          )
        ):
        (
          isUserJoined?
          (
            pointsTable?
            (
              <PointsTable data={data}/>
            ):
            (
              <PlayerTable data={data}/>
            )
          ):
          (
            <PointsTable data={data}/>
          )
        )
      }
    </Box>
  )
}
export default Points
