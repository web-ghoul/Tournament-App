import React from 'react'
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"

//Component
import Logo from '../Logo/Logo'

//MUI
import {  Box, Container, Divider, Link, Typography } from '@mui/material'
import { FlexStack } from '../../MUIComponents/FlexStack/FlexStack'
import { HeaderTypo } from '../../MUIComponents/HeaderTypo/HeaderTypo'

//Style
import styles from "./Footer.module.css"

const Footer = () => {
  const navigate = useNavigate()
  const {webGhoulContacts , amrContacts} = useSelector((state)=>state.links)

  return (
    <Box component={"footer"} className='flex-center'>
      <Container className={styles.contain}>
        <Box className={`flex-between ${styles.up}`}>
          <Logo/>
          <FlexStack className={styles.pages}>
            <HeaderTypo variant='h6' onClick={()=>navigate(process.env.REACT_APP_HOME_PAGE)}>Home</HeaderTypo>
            <HeaderTypo variant='h6' onClick={()=>navigate(process.env.REACT_APP_TOURNAMENTS_PAGE)}>Tournaments</HeaderTypo>
            <HeaderTypo variant='h6' onClick={()=>navigate(process.env.REACT_APP_ABOUT_PAGE)}>About Us</HeaderTypo>
            <HeaderTypo variant='h6' onClick={()=>navigate(process.env.REACT_APP_TUTORIAL_PAGE)}>Tutorial</HeaderTypo>
          </FlexStack>
        </Box>
        <Divider/>
        <Box>
          <Typography className='text-center' variant="h5">
            Copyright © 2023. All Rights Reserved By <span className={styles.name}>
            <Link href={webGhoulContacts.linkedin}>webGhoul</Link> & <Link href={amrContacts.linkedin}>Amr006</Link></span>
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
