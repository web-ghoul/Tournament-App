import {  Box, Container, Divider, IconButton, Typography } from '@mui/material'
import Logo from '../Logo/Logo'
import styles from "./Footer.module.css"
import React from 'react'
import { FlexStack } from '../FlexStack/FlexStack'
import {useNavigate} from "react-router-dom"
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { HeaderTypo } from '../HeaderTypo/HeaderTypo'

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
              <FacebookRoundedIcon/>
            </IconButton>
            <IconButton>
              <TwitterIcon/>
            </IconButton>
            <IconButton>
              <WhatsAppIcon/>
            </IconButton>
            <IconButton>
              <LinkedInIcon/>
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
