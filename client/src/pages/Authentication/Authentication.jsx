import React from 'react'
import { Box,Button, Container, Typography } from '@mui/material'
import {MyBox} from "../../components/MyBox/MyBox"
import styles from "./Authentication.module.css"
import Form from  "../../components/Form/Form "
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useNavigate } from 'react-router-dom'

const Authentication = ({formType}) => {
  const navigate = useNavigate()
  return (
    <MyBox className={`flex-center ${styles.form_section}`}>
      <Container className={`grid-center ${styles.form_contain}`}>
        <Box className={`flex-center ${styles.btn_back}`}>
          <Button onClick={()=>navigate(process.env.REACT_APP_HOME_PAGE)} className='flex-center'>
            <ArrowBackIosNewRoundedIcon/>
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
