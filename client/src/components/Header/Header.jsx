import { AppBar, Container, Toolbar, IconButton, Box, Button, useMediaQuery, Menu, MenuItem, Typography, Divider } from '@mui/material'
import {AccountCircleRounded} from "@mui/icons-material"
import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import {FlexStack} from "../FlexStack/FlexStack"
import Logo from '../Logo/Logo'
import styles from "./Header.module.css"
import { HeaderTypo } from '../HeaderTypo/HeaderTypo'
import LoginIcon from '@mui/icons-material/Login';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import HouseRoundedIcon from '@mui/icons-material/HouseRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import { useDispatch, useSelector } from 'react-redux'
import {logout} from "../../store/authSlice"
import Cookie from "js-cookie"
import {showing , hiding} from "../../store/scrollSlice"

const Header = () => {
  const [open , setOpen] = useState(false)
  const [openMenu , setOpenMenu] = useState(false)
  const lgSize = useMediaQuery("(max-width:1200px)")
  const navigate = useNavigate()
  const [headerClass , setHeaderClass] = useState(true)
  const dispatch = useDispatch()
  const username = useSelector((state)=>state.auth.username)
  const [sign , setSign] = useState(Boolean(username))

  window.onscroll = ()=>{
    if(window.scrollY === 0){
      setHeaderClass(true)
      dispatch(hiding())
    }else{
      setHeaderClass(false)
      dispatch(showing())
    }
  }

  const handleLogout = ()=>{
    Cookie.remove("user_data")
    setSign(false)
    navigate(process.env.REACT_APP_LOGIN_PAGE)
    dispatch(logout())
  }

  return (
    <AppBar className={ headerClass ? styles.header : styles.header_active}>
      <Container>
        <Toolbar className={`flex-between ${ headerClass ? styles.header_contain : styles.header_contain_active}`}>
          <Logo/>
          {
            sign ? 
              (
                !lgSize?
                (
                  <>
                    <FlexStack className={styles.pages}>
                      <HeaderTypo variant="h5" onClick={()=>navigate(process.env.REACT_APP_HOME_PAGE)}>Home</HeaderTypo>
                      <HeaderTypo variant="h5" onClick={()=>navigate("#tournaments")}>Tournaments</HeaderTypo>
                      <HeaderTypo variant="h5" onClick={()=>navigate(process.env.REACT_APP_ABOUT_PAGE)}>About Us</HeaderTypo>
                      <HeaderTypo variant="h5" onClick={()=>navigate(process.env.REACT_APP_PROFILE_PAGE)}>Profile</HeaderTypo>
                    </FlexStack>
                    <IconButton onClick={()=>setOpen(true)}>
                      <AccountCircleRounded sx={{color:'white'}} fontSize='large'/>
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      open={open}
                      onClose={()=>setOpen(false)}
                      anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                      }}
                      transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                      }}
                    >
                      <MenuItem  onClick={()=>navigate(process.env.REACT_APP_PROFILE_PAGE)} gap={2}>
                        <AccountCircleRounded fontSize='large'/>
                        <Typography variant='h5'>{username}</Typography>
                      </MenuItem>
                      <Divider/>
                      <MenuItem onClick={()=>handleLogout()}>
                        <LoginIcon/>
                        <Typography variant='h5'>Log Out</Typography>
                      </MenuItem>
                    </Menu>
                  </>
                ):
                (
                  <>
                    <IconButton onClick={()=>setOpenMenu(true)}>
                      <MenuRoundedIcon/>
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      open={openMenu}
                      onClose={()=>setOpenMenu(false)}
                      anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                      }}
                      transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                      }}
                    >
                      <MenuItem onClick={()=>navigate(process.env.REACT_APP_PROFILE_PAGE)} gap={2}>
                        <AccountCircleRounded fontSize='large'/>
                        <Typography variant='h5'>{username}</Typography>
                      </MenuItem>
                      <Divider/>
                      <MenuItem onClick={()=>navigate(process.env.REACT_APP_HOME_PAGE)} gap={2}>
                        <HouseRoundedIcon/>
                        <Typography variant='h5'>Home</Typography>
                      </MenuItem>
                      <MenuItem onClick={()=>navigate("/#tournaments")}>
                        <EmojiEventsRoundedIcon/>
                        <Typography variant='h5'>Tournaments</Typography>
                      </MenuItem>
                      <MenuItem onClick={()=>navigate(process.env.REACT_APP_ABOUT_PAGE)}>
                        <InfoRoundedIcon/>
                        <Typography variant='h5'>About Us</Typography>
                      </MenuItem>
                      <MenuItem onClick={()=>navigate(process.env.REACT_APP_PROFILE_PAGE)}>
                        <AccountCircleRounded/>
                        <Typography variant='h5'>Profile</Typography>
                      </MenuItem>
                      <MenuItem onClick={()=>handleLogout()}>
                        <LoginIcon/>
                        <Typography variant='h5'>Log Out</Typography>
                      </MenuItem>
                    </Menu>
                  </>
                )
              ):
              (
                !lgSize?
                (
                  <Box className={`flex-end ${styles.btns}`}>
                    <Button onClick={()=>navigate(process.env.REACT_APP_LOGIN_PAGE)}>Log in</Button>
                    <Button onClick={()=>navigate(process.env.REACT_APP_SIGNUP_PAGE)}>Sign Up</Button>
                  </Box>
                ):
                (
                  <>
                    <IconButton onClick={()=>setOpenMenu(true)}>
                      <LoginIcon/>
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      open={openMenu}
                      onClose={()=>setOpenMenu(false)}
                      anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                      }}
                      transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                      }}
                    >
                      <MenuItem onClick={()=>navigate(process.env.REACT_APP_LOGIN_PAGE)}>
                        <Typography variant='h5'>Log In</Typography>
                      </MenuItem>
                      <MenuItem onClick={()=>navigate(process.env.REACT_APP_SIGNUP_PAGE)}>
                        <Typography variant='h5'>Sign Up</Typography>
                      </MenuItem>
                    </Menu>
                  </>
                )
              )
          }
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
