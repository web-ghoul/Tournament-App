import React from 'react'
import {useNavigate} from "react-router-dom"

//MUI
import { Button, Typography } from '@mui/material'
import { Tour } from '@mui/icons-material'
import { FlexStack } from '../../MUIComponents/FlexStack/FlexStack'

//Style
import styles from "./Logo.module.css"

const Logo = (props) => {
  const navigate = useNavigate()
  return (
    <Button onClick={()=>navigate("/")}>
      <FlexStack className={`${styles.logo}`} flex={props.flex}>
          <Tour/>
          <Typography variant='h4' className={styles.title}>Tournament</Typography>
      </FlexStack>
    </Button>
  )
}

export default Logo
