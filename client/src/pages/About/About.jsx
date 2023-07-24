import React from 'react'

//Images
import webGhoul from "../../static/images/webGhoul.jpeg"
import amr from "../../static/images/amr.jpg"

//MUI
import { Box, Container, IconButton, Typography } from '@mui/material'
import {LinkedIn,Facebook,GitHub, WhatsApp} from '@mui/icons-material';
import {MyBox} from "../../MUIComponents/MyBox/MyBox"

//Style
import styles from './About.module.css'
import Head from '../../components/Head/Head';

const About = () => {

  const webGhoulContacts = {
    "linkedin":"https://www.linkedin.com/in/mahmoud-salama-23b627211/",
    "facebook":"https://www.facebook.com/mahmoud.gogoo.5/",
    "whatsapp":"https://wa.me/+201009344881",
    "github":"https://github.com/web-ghoul"
  }

  const amrContacts = {
    "linkedin":"https://www.linkedin.com/in/amr-khaled-mohamed/",
    "facebook":"https://www.facebook.com/profile.php?id=100006620191591",
    "whatsapp":"https://wa.me/+201013714763",
    "github":"https://github.com/Amr006"
  }

  return (
    <MyBox className={`${styles.about}`}>
        <Container className={`grid-stretch ${styles.about_contain}`}>
          <Head title={"About Us"} description ={"We are a MERN Stack Team , We build Tournament App to help Players to organize a Chess Game and each Player will know who is Play with him from Graph"}/>
          <Box>
            <Typography variant='h2' className='tac'></Typography>
            <Typography variant='h6' className='text-center el-center-x para'></Typography>
          </Box>
          <Box className={`grid-stretch ${styles.team}`}>
            <Box className={`flex-between ${styles.member} ${styles.webGhoul}`}>
              <Box className={`flex-start ${styles.info}`}>
                <Box className={`flex-center ${styles.photo}`}>
                  <Box component={"img"} alt="webGhoul" src={webGhoul}/>
                </Box>
                <Box className={`grid-start`}>
                  <Typography variant='h3'>webGhoul</Typography>
                  <Typography variant='h4' className={`${styles.job}`}>Front-End Developer</Typography>
                </Box>
              </Box>
              <Box className={`grid-end ${styles.contact}`}>
                <Typography variant='h4' className={`tac`}>Contact Me</Typography>
                <Box className={`flex-center ${styles.icons}`}>
                  <IconButton onClick={()=>window.location.href=webGhoulContacts.linkedin}>
                    <LinkedIn/>
                  </IconButton>
                  <IconButton onClick={()=>window.location.href=webGhoulContacts.github}>
                    <GitHub/>
                  </IconButton>
                  <IconButton onClick={()=>window.location.href=webGhoulContacts.facebook}>
                    <Facebook/>
                  </IconButton>
                  <IconButton onClick={()=>window.location.href=webGhoulContacts.whatsapp}>
                    <WhatsApp/>
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Box className={`flex-between ${styles.member}  ${styles.amr}`}>
              <Box className={`flex-start ${styles.info}`}>
                <Box className={`flex-center ${styles.photo}`}>
                  <Box component={"img"} alt="amr" src={amr}/>
                </Box>
                <Box className={`grid-start`}>
                  <Typography variant='h3'>Amr</Typography>
                  <Typography variant='h4' className={`${styles.job}`}>Back-End Developer</Typography>
                </Box>
              </Box>
              <Box className={`grid-end ${styles.contact}`}>
                <Typography variant='h4' className={`tac`}>Contact Me</Typography>
                <Box className={`flex-center ${styles.icons}`}>
                  <IconButton onClick={()=>window.location.href=amrContacts.linkedin}>
                    <LinkedIn/>
                  </IconButton>
                  <IconButton onClick={()=>window.location.href=amrContacts.github}>
                    <GitHub/>
                  </IconButton>
                  <IconButton onClick={()=>window.location.href=amrContacts.facebook}>
                    <Facebook/>
                  </IconButton>
                  <IconButton onClick={()=>window.location.href=amrContacts.whatsapp}>
                    <WhatsApp/>
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
    </MyBox>
  )
}

export default About
