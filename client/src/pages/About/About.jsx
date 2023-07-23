<<<<<<< HEAD
import React from 'react'
import {MyBox} from "../../components/MyBox/MyBox"
import { Box, Container, IconButton, Typography } from '@mui/material'
import styles from './About.module.css'
import webGhoul from "../../static/images/webGhoul.jpeg"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
const About = () => {
  return (
    <MyBox className={`${styles.about}`}>
        <Container className={`grid-stretch ${styles.about_contain}`}>
          <Box>
            <Typography variant='h2' className='tac'>About Us</Typography>
          </Box>
          <Box className={`grid-stretch ${styles.team}`}>
            <Box className={`flex-between ${styles.member}`}>
              <Box className={`flex-start ${styles.info}`}>
                <Box className={`flex-center ${styles.photo}`}>
                  <Box component={"img"} alt="webGhoul" src={webGhoul}/>
                </Box>
                <Typography variant='h3'>webGhoul</Typography>
              </Box>
              <Box className={`grid-end ${styles.contact}`}>
                <Typography variant='h4' className={`tac`}>Contact Me</Typography>
                <Box className={`flex-center ${styles.icons}`}>
                  <IconButton>
                    <LinkedInIcon/>
                  </IconButton>
                  <IconButton>
                    <GitHubIcon/>
                  </IconButton>
                  <IconButton>
                    <FacebookIcon/>
                  </IconButton>
                  <IconButton>
                    <InstagramIcon/>
                  </IconButton>
                </Box>
              </Box>
            </Box>

            <Box className={`flex-between ${styles.member}`}>
              <Box className={`flex-start ${styles.info}`}>
                <Box className={`flex-center ${styles.photo}`}>
                  <Box component={"img"} alt="webGhoul" src={webGhoul}/>
                </Box>
                <Typography variant='h3'>webGhoul</Typography>
              </Box>
              <Box className={`grid-end ${styles.contact}`}>
                <Typography variant='h4' className={`tac`}>Contact Me</Typography>
                <Box className={`flex-center ${styles.icons}`}>
                  <IconButton>
                    <LinkedInIcon/>
                  </IconButton>
                  <IconButton>
                    <GitHubIcon/>
                  </IconButton>
                  <IconButton>
                    <FacebookIcon/>
                  </IconButton>
                  <IconButton>
                    <InstagramIcon/>
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
=======
import React from 'react'

const About = () => {
  return (
    <div>
      
    </div>
  )
}

export default About
>>>>>>> 212162d2f875d71fffb8130d5eff55f2d752d3ff
