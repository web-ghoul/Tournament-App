import { AppBar, Container, Toolbar, IconButton, Box, Button, useMediaQuery, Menu, MenuItem, Typography, Divider } from '@mui/material'
import {AccountCircleRounded, Troubleshoot} from "@mui/icons-material"
import React, { useEffect, useState } from 'react'
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
import {showing , hiding} from "../../store/scrollSlice"
import AddIcon from '@mui/icons-material/Add';
import AdminModal from '../AdminModal/AdminModal'
import Cookies from 'js-cookie'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const lgSize = useMediaQuery("(max-width:1200px)")
  const [isAdmin,setIsAdmin] = useState(false)
  const [openModal, setOpenModal] = useState(false);
  const [headerClass , setHeaderClass] = useState(true)
  const [add, setAdd] =useState(null)
  const [sign , setSign] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  let userData = Cookies.get('user_data')
  const open = Boolean(anchorEl);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setAdd(null)
  }
  window.onscroll = ()=>{
    if(window.scrollY === 0){
      setHeaderClass(true)
      dispatch(hiding())
    }else{
      setHeaderClass(false)
      dispatch(showing())
    }
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = ()=>{
    Cookies.remove("user_data")
    setSign(false)
    navigate(process.env.REACT_APP_LOGIN_PAGE)
    dispatch(logout())
    handleClose()
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(()=>{
    if(userData){
        setSign(true)
    }
  },[userData,sign])
  return (
    <AppBar className={ headerClass ? styles.header : styles.header_active}>
      {add === "admin" ? <AdminModal handleCloseModal={handleCloseModal} openModal={openModal} state="admin"/> : add === "tournament" ? <AdminModal openModal={openModal} handleCloseModal={handleCloseModal} state="tournament"/>:<AdminModal openModal={openModal}  handleCloseModal={handleCloseModal} setAdd={setAdd}/>}
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
                      <HeaderTypo variant="h5" onClick={()=>{navigate(process.env.REACT_APP_HOME_PAGE) ; handleClose()}}>Home</HeaderTypo>
                      <HeaderTypo variant="h5" onClick={()=>{navigate("/tournaments") ; handleClose()}}>Tournaments</HeaderTypo>
                      <HeaderTypo variant="h5" onClick={()=>{navigate(process.env.REACT_APP_ABOUT_PAGE) ; handleClose()}}>About Us</HeaderTypo>
                      <HeaderTypo variant="h5" onClick={()=>{navigate(process.env.REACT_APP_PROFILE_PAGE) ; handleClose()}}>Profile</HeaderTypo>
                    </FlexStack>
                    <IconButton onClick={handleClick}>
                      <AccountCircleRounded sx={{color:'white'}} fontSize='large'/>
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                      }}
                      transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                      }}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem className={`flex-center`} onClick={()=>{navigate(process.env.REACT_APP_PROFILE_PAGE) ; handleClose()}} gap={2}>
                        <AccountCircleRounded fontSize='large'/>
                        <Typography variant='h5'>{userData.username}</Typography>
                      </MenuItem>
                      <Divider/>
                      <MenuItem onClick={()=>{
                        handleOpenModal();
                        handleClose();
                      }} className={`flex-center`}>
                        <AddIcon fontSize='large'/> 
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
                    <IconButton   onClick={handleClick}>
                      <MenuRoundedIcon/>
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                      }}
                      transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                      }}
                    >
                      <MenuItem onClick={()=>{navigate(process.env.REACT_APP_PROFILE_PAGE) ; handleClose()}} gap={2}>
                        <AccountCircleRounded fontSize='large'/>
                        <Typography variant='h5'>{userData.username}</Typography>
                      </MenuItem>
                      <Divider/>
                      <MenuItem onClick={()=>{navigate(process.env.REACT_APP_HOME_PAGE) ; handleClose()}} gap={2}>
                        <HouseRoundedIcon/>
                        <Typography variant='h5'>Home</Typography>
                      </MenuItem>
                      <MenuItem onClick={()=>{navigate("/tournaments") ; handleClose()}}>
                        <EmojiEventsRoundedIcon/>
                        <Typography variant='h5'>Tournaments</Typography>
                      </MenuItem>
                      <MenuItem onClick={()=>{navigate(process.env.REACT_APP_ABOUT_PAGE) ; handleClose()}}>
                        <InfoRoundedIcon/>
                        <Typography variant='h5'>About Us</Typography>
                      </MenuItem>
                      <MenuItem onClick={()=>{navigate(process.env.REACT_APP_PROFILE_PAGE) ; handleClose()}}>
                        <AccountCircleRounded/>
                        <Typography variant='h5'>Profile</Typography>
                      </MenuItem>
                      <MenuItem onClick={()=>{
                        handleOpenModal();
                        handleClose();
                      }} className={`flex-center`}>
                        <AddIcon fontSize='large'/> 
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
                    <Button onClick={()=>{navigate(process.env.REACT_APP_LOGIN_PAGE) ; handleClose()}}>Log in</Button>
                    <Button onClick={()=>{navigate(process.env.REACT_APP_SIGNUP_PAGE) ; handleClose()}}>Sign Up</Button>
                  </Box>
                ):
                (
                  <>
                    <IconButton  onClick={handleClick}>
                      <LoginIcon/>
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                      }}
                      transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                      }}
                    >
                      <MenuItem onClick={()=>{navigate(process.env.REACT_APP_LOGIN_PAGE) ; handleClose()}}>
                        <Typography variant='h5'>Log In</Typography>
                      </MenuItem>
                      <MenuItem onClick={()=>{navigate(process.env.REACT_APP_SIGNUP_PAGE) ; handleClose()}}>
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
