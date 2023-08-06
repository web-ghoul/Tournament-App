import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import {showing , hiding} from "../../store/slices/scrollSlice"
import {logout} from "../../store/slices/authSlice"
import Cookies from 'js-cookie'
import { openAddTournamentModal, openAddAdminModal } from '../../store/slices/addModalSlice'

//Components
import Logo from '../Logo/Logo'
import AddTournament from '../AddTournament/AddTournament'
import AddAdmin from '../AddAdmin/AddAdmin'

//MUI
import { AppBar, Container, Toolbar, IconButton, Box, Button, useMediaQuery, Menu, MenuItem, Typography, Divider } from '@mui/material'
import {MenuRounded,AccountCircleOutlined,AddCircleOutline,Login,EmojiEventsOutlined,InfoOutlined,HomeOutlined, Lightbulb, PersonAddAltRounded, LoginRounded} from '@mui/icons-material';
import {FlexStack} from "../../MUIComponents/FlexStack/FlexStack"
import { HeaderTypo } from '../../MUIComponents/HeaderTypo/HeaderTypo'

//Style
import styles from "./Header.module.css"

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const lgSize = useMediaQuery("(max-width:992px)")
  const {username,role} = useSelector((state)=>state.auth)
  const [headerClass , setHeaderClass] = useState(true)
  const [sign , setSign] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = ()=>{
    try{
      Cookies.remove("user_data")
      Cookies.remove("token")
    }catch(err){
      console.log(err)
    }
    setSign(false)
    navigate(process.env.REACT_APP_LOGIN_PAGE)
    dispatch(logout())
    handleClose()
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  window.onscroll = ()=>{
    if(window.scrollY === 0){
      setHeaderClass(true)
      dispatch(hiding())
    }else{
      setHeaderClass(false)
      dispatch(showing())
    }
  }

  useEffect(()=>{
    if(username){
        setSign(true)
    }
  },[username,sign])

  return (
    <AppBar className={ headerClass ? styles.header : styles.header_active}>
      
      <AddTournament/>

      {
        role==="Admin" && <AddAdmin/>
      }
      
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
                      <HeaderTypo variant="h5" onClick={()=>{navigate(process.env.REACT_APP_TUTORIAL_PAGE) ; handleClose()}}>Tutorial</HeaderTypo>
                      <HeaderTypo variant="h5" onClick={()=>{navigate(`/profile/${username}`) ; handleClose()}}>Profile</HeaderTypo>
                    </FlexStack>
                    <IconButton onClick={handleClick}>
                      <AccountCircleOutlined sx={{color:'white'}} fontSize='large'/>
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
                      className={`${styles.menu}`}
                    >
                      <MenuItem className={`${styles.item}`}  onClick={()=>{navigate(`/profile/${username}`); handleClose()}}>
                        <AccountCircleOutlined fontSize='large'/>
                        <Typography variant='h5'>{username}</Typography>
                      </MenuItem>
                      <Divider/>
                      <MenuItem  className={`${styles.item}`}  onClick={()=>{
                          dispatch(openAddTournamentModal());
                          handleClose();
                      }}>
                        <AddCircleOutline fontSize='large'/> 
                        <Typography variant='h5'>Add Tournament</Typography>
                      </MenuItem>
                      {
                        role === "Admin" && (
                          <MenuItem className={`${styles.item}`} onClick={()=>{
                            dispatch(openAddAdminModal());
                            handleClose();
                          }}>
                            <PersonAddAltRounded/> 
                            <Typography variant='h5'>Add Admin</Typography>
                          </MenuItem>
                        )
                      } 
                      <MenuItem  className={`${styles.item}`}  onClick={()=>handleLogout()}>
                        <Login/>
                        <Typography variant='h5'>Log Out</Typography>
                      </MenuItem>
                    </Menu>
                  </>
                ):
                (
                  <>
                    <IconButton onClick={handleClick}>
                      <MenuRounded/>
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
                      className={`${styles.menu}`}
                    >
                      <MenuItem onClick={()=>{navigate(`/profile/${username}`); handleClose()}} className={`${styles.username}`}>
                        <AccountCircleOutlined fontSize='large'/>
                        <Typography variant='h4'>{username}</Typography>
                      </MenuItem>
                      <Divider/>
                      <MenuItem className={`${styles.item}`} onClick={()=>{navigate(process.env.REACT_APP_HOME_PAGE) ; handleClose()}} gap={2}>
                        <HomeOutlined/>
                        <Typography variant='h5'>Home</Typography>
                      </MenuItem>
                      <MenuItem className={`${styles.item}`} onClick={()=>{navigate("/tournaments") ; handleClose()}}>
                        <EmojiEventsOutlined/>
                        <Typography variant='h5'>Tournaments</Typography>
                      </MenuItem>
                      <MenuItem className={`${styles.item}`} onClick={()=>{navigate(process.env.REACT_APP_ABOUT_PAGE) ; handleClose()}}>
                        <InfoOutlined/>
                        <Typography variant='h5'>About Us</Typography>
                      </MenuItem>
                      <MenuItem className={`${styles.item}`} onClick={()=>{navigate(process.env.REACT_APP_TUTORIAL_PAGE) ; handleClose()}}>
                        <Lightbulb/>
                        <Typography variant='h5'>Tutorial</Typography>
                      </MenuItem>
                      <MenuItem className={`${styles.item}`} onClick={()=>{navigate(`/profile/${username}`) ; handleClose()}}>
                        <AccountCircleOutlined/>
                        <Typography variant='h5'>Profile</Typography>
                      </MenuItem>
                      <MenuItem className={`${styles.item}`} onClick={()=>{
                        dispatch(openAddTournamentModal());
                        handleClose();
                      }}>
                        <AddCircleOutline/> 
                        <Typography variant='h5'>Add Tournament</Typography>
                      </MenuItem>
                      {
                        role === "Admin" &&(
                          <MenuItem className={`${styles.item}`} onClick={()=>{
                            dispatch(openAddAdminModal());
                            handleClose();
                          }}>
                            <PersonAddAltRounded/> 
                            <Typography variant='h5'>Add Admin</Typography>
                          </MenuItem>
                        )
                      }
                      <MenuItem className={`${styles.item}`} onClick={()=>handleLogout()}>
                        <Login/>
                        <Typography variant='h5'>Log Out</Typography>
                      </MenuItem>
                    </Menu>
                  </>
                )
              ):
              (
                !lgSize?
                (
                  <>
                    <FlexStack className={styles.pages}>
                      <HeaderTypo variant="h5" onClick={()=>{navigate(process.env.REACT_APP_HOME_PAGE) ; handleClose()}}>Home</HeaderTypo>
                      <HeaderTypo variant="h5" onClick={()=>{navigate("/tournaments") ; handleClose()}}>Tournaments</HeaderTypo>
                      <HeaderTypo variant="h5" onClick={()=>{navigate(process.env.REACT_APP_ABOUT_PAGE) ; handleClose()}}>About Us</HeaderTypo>
                      <HeaderTypo variant="h5" onClick={()=>{navigate(process.env.REACT_APP_TUTORIAL_PAGE) ; handleClose()}}>Tutorial</HeaderTypo>
                    </FlexStack>
                    <Box className={`flex-end ${styles.btns}`}>
                      <Button onClick={()=>{navigate(process.env.REACT_APP_LOGIN_PAGE) ; handleClose()}}>Log in</Button>
                      <Button onClick={()=>{navigate(process.env.REACT_APP_SIGNUP_PAGE) ; handleClose()}}>Sign Up</Button>
                    </Box>
                  </>
                ):
                (
                  <>
                    <IconButton onClick={handleClick}>
                      <MenuRounded/>
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
                      className={`${styles.menu}`}
                    >
                      <MenuItem className={`${styles.item}`} onClick={()=>{navigate(process.env.REACT_APP_HOME_PAGE) ; handleClose()}} gap={2}>
                        <HomeOutlined/>
                        <Typography variant='h5'>Home</Typography>
                      </MenuItem>
                      <MenuItem className={`${styles.item}`} onClick={()=>{navigate("/tournaments") ; handleClose()}}>
                        <EmojiEventsOutlined/>
                        <Typography variant='h5'>Tournaments</Typography>
                      </MenuItem>
                      <MenuItem className={`${styles.item}`} onClick={()=>{navigate(process.env.REACT_APP_ABOUT_PAGE) ; handleClose()}}>
                        <InfoOutlined/>
                        <Typography variant='h5'>About Us</Typography>
                      </MenuItem>
                      <MenuItem className={`${styles.item}`} onClick={()=>{navigate(process.env.REACT_APP_TUTORIAL_PAGE) ; handleClose()}}>
                        <Lightbulb/>
                        <Typography variant='h5'>Tutorial</Typography>
                      </MenuItem>
                      <MenuItem className={`${styles.item}`} onClick={()=>{
                        dispatch(openAddTournamentModal());
                        handleClose();
                      }}>
                        <AddCircleOutline/> 
                        <Typography variant='h5'>Add Tournament</Typography>
                      </MenuItem>
                      {
                        role === "Admin" && (
                          <MenuItem className={`${styles.item}`} onClick={()=>{
                            dispatch(openAddAdminModal());
                            handleClose();
                          }}>
                            <PersonAddAltRounded/> 
                            <Typography variant='h5'>Add Admin</Typography>
                          </MenuItem>
                        )
                      }
                      <MenuItem  className={`${styles.item}`} onClick={()=>{navigate(process.env.REACT_APP_LOGIN_PAGE) ; handleClose()}}>
                        <LoginRounded/>
                        <Typography variant='h5'>Log in</Typography>
                      </MenuItem>
                      <MenuItem  className={`${styles.item}`} onClick={()=>{navigate(process.env.REACT_APP_SIGNUP_PAGE) ; handleClose()}}>
                        <PersonAddAltRounded/>
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
