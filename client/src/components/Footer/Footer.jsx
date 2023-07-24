import React from 'react'
import {useNavigate} from "react-router-dom"

//Component
import Logo from '../Logo/Logo'

//MUI
import {  Box, Container, Divider, IconButton, Typography } from '@mui/material'
import {LinkedIn,Twitter,WhatsApp,FacebookRounded} from '@mui/icons-material';
import { FlexStack } from '../../MUIComponents/FlexStack/FlexStack'
import { HeaderTypo } from '../../MUIComponents/HeaderTypo/HeaderTypo'

//Style
import styles from "./Footer.module.css"

const Footer = () => {
  const navigate = useNavigate()
  return (
    <Box component={"footer"} className='flex-center'>
      <Container className={styles.contain}>
        <Box className={`flex-between ${styles.up}`}>
          <Logo/>
          <FlexStack className={styles.pages}>
            <HeaderTypo variant='h6' onClick={()=>navigate("/")}>Home</HeaderTypo>
            <HeaderTypo variant='h6' onClick={()=>navigate("/tournaments")}>Tournament</HeaderTypo>
            <HeaderTypo variant='h6' onClick={()=>navigate("/about")}>About Us</HeaderTypo>
          </FlexStack>
          <Box className={styles.icons}>
            <IconButton>
              <FacebookRounded/>
            </IconButton>
            <IconButton>
              <Twitter/>
            </IconButton>
            <IconButton>
              <WhatsApp/>
            </IconButton>
            <IconButton>
              <LinkedIn/>
            </IconButton>
          </Box>
        </Box>
        <Divider/>
        <Box>
          <Typography className='text-center' variant="h5">
            Copyright © 2023. All Rights Reserved By <span className={styles.name}>webGhoul</span>
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
