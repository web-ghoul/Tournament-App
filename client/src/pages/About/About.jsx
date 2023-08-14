import React from 'react'
import {useSelector} from "react-redux"
import Head from '../../components/Head/Head';

//Images
import webGhoul from "../../static/images/webGhoul.jpeg"
import amr from "../../static/images/amr.jpg"
import reactImg from "../../static/images/react.png"
import nodeImg from "../../static/images/node.jpg"

//MUI
import { Box, Container, IconButton, Tooltip, Typography } from '@mui/material'
import {LinkedIn,Facebook,GitHub, WhatsApp} from '@mui/icons-material';
import {MyBox} from "../../MUIComponents/MyBox/MyBox"

//Style
import styles from './About.module.css'

const About = () => {

  const {webGhoulContacts , amrContacts} = useSelector((state)=>state.links)

  return (
    <MyBox className={`${styles.about}`}>
        <Container className={`grid-stretch ${styles.about_contain}`}>
          <Head title={"About Us"} h={"h2"} align={"center"} description ={"We are a MERN Stack Team , We build Tournament App to help Players to organize a Chess Game and each Player will know who is Play with him from Graph"}/>
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
              <Box component={"img"} alt="react" src={reactImg}/>
              <Box className={`grid-end ${styles.contact}`}>
                <Typography variant='h4' className={`tac`}>Contact Me</Typography>
                <Box className={`flex-center ${styles.icons}`}>
                  <Tooltip title="linkedin">
                    <IconButton onClick={()=>window.location.href=webGhoulContacts.linkedin}>
                      <LinkedIn/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="github">
                    <IconButton onClick={()=>window.location.href=webGhoulContacts.github}>
                      <GitHub/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="facebook">
                    <IconButton onClick={()=>window.location.href=webGhoulContacts.facebook}>
                      <Facebook/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="whatsapp">
                    <IconButton onClick={()=>window.location.href=webGhoulContacts.whatsapp}>
                      <WhatsApp/>
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
            <Box className={`flex-between ${styles.member}  ${styles.amr}`}>
              <Box className={`flex-start ${styles.info}`}>
                <Box className={`flex-center ${styles.photo}`}>
                  <Box component={"img"} alt="amr" src={amr}/>
                </Box>
                <Box className={`grid-start`}>
                  <Typography variant='h3'>Amr006</Typography>
                  <Typography variant='h4' className={`${styles.job}`}>Back-End Developer</Typography>
                </Box>
              </Box>
              <Box component={"img"} alt="node" src={nodeImg}/>
              <Box className={`grid-end ${styles.contact}`}>
                <Typography variant='h4' className={`tac`}>Contact Me</Typography>
                <Box className={`flex-center ${styles.icons}`}>
                  <Tooltip title="linkedin">
                    <IconButton onClick={()=>window.location.href=amrContacts.linkedin}>
                      <LinkedIn/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="github">
                    <IconButton onClick={()=>window.location.href=amrContacts.github}>
                      <GitHub/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="facebook">
                    <IconButton onClick={()=>window.location.href=amrContacts.facebook}>
                      <Facebook/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="whatsapp">
                    <IconButton onClick={()=>window.location.href=amrContacts.whatsapp}>
                      <WhatsApp/>
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
    </MyBox>
  )
}

export default About
