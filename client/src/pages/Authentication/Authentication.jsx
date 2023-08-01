import React from 'react'
import { useNavigate } from 'react-router-dom'

//Components
import Form from  "../../components/Form/Form "

//MUI
import { Box,Button, Container, Typography } from '@mui/material'
import {ArrowBackIosNewRounded} from '@mui/icons-material';
import {MyBox} from "../../MUIComponents/MyBox/MyBox"

//Style
import styles from "./Authentication.module.css"

const Authentication = ({formType}) => {
  const navigate = useNavigate()
  return (
    <MyBox className={`flex-center ${styles.form_section}`}>
      <Container className={`grid-center ${styles.form_contain}`}>
        <Box className={`flex-center ${styles.btn_back}`}>
          <Button onClick={()=>navigate(process.env.REACT_APP_HOME_PAGE)} className='flex-center'>
            <ArrowBackIosNewRounded/>
            <Typography variant='h5'>Back to Tournaments</Typography>
          </Button>
          {/* <Logo/> */}
        </Box>
        <Form formType = {formType}/>
      </Container>
    </MyBox>
  )
}

export default Authentication
