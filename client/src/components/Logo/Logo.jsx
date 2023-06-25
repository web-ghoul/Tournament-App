import { Tour } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { FlexStack } from '../FlexStack/FlexStack'
import styles from "./Logo.module.css"
import {useNavigate} from "react-router-dom"
import React from 'react'

const Logo = (props) => {
  const navigate = useNavigate()
  return (
    <Button onClick={()=>navigate("/")}>
      <FlexStack gap={1} flex={props.flex}>
          <Tour fontSize="large"/>
          <Typography variant='h5' className={styles.title}>Your Tournament</Typography>
      </FlexStack>
    </Button>
  )
}

export default Logo
