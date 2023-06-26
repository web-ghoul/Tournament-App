import { AppBar, Container, Toolbar, IconButton, Box, Button, useTheme, useMediaQuery, Menu, MenuItem, Typography } from '@mui/material'
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

const Header = () => {
  const [open , setOpen] = useState(false)
  const [openMenu , setOpenMenu] = useState(false)
  const theme = useTheme()
  console.log(theme)
  const lgSize = useMediaQuery(theme.breakpoints.down("lg"))
  const mdSize = useMediaQuery(theme.breakpoints.down("md"))
  const navigate = useNavigate()
  const [sign , setSign] = useState(false)
  const [headerClass , setHeaderClass] = useState(true)
  window.onscroll = ()=>{
    if(window.scrollY === 0){
      setHeaderClass(true)
    }else{
      setHeaderClass(false)
    }
  }
  return (
    <AppBar className={ headerClass ? styles.header : styles.header_active}>
      <Container>
        <Toolbar className={`flex-between ${ headerClass ? styles.header_contain : styles.header_contain_active}`}>
          <Logo/>
          {
            mdSize ?
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
                  <MenuItem onClick={()=>navigate("/")} gap={2}>
                    <HouseRoundedIcon/>
                    <Typography variant='h5'>Home</Typography>
                  </MenuItem>
                  <MenuItem onClick={()=>navigate("#tournaments")}>
                    <EmojiEventsRoundedIcon/>
                    <Typography variant='h5'>Tournaments</Typography>
                  </MenuItem>
                  <MenuItem onClick={()=>navigate("/about")}>
                    <InfoRoundedIcon/>
                    <Typography variant='h5'>About Us</Typography>
                  </MenuItem>
                  <MenuItem onClick={()=>navigate("/profile")}>
                    <AccountCircleRounded/>
                    <Typography variant='h5'>Profile</Typography>
                  </MenuItem>
                </Menu>
              </>
            ):
            (
              <>
                <FlexStack className={styles.pages}>
                  <HeaderTypo variant="h5" onClick={()=>navigate("/")}>Home</HeaderTypo>
                  <HeaderTypo variant="h5" onClick={()=>navigate("#tournaments")}>Tournaments</HeaderTypo>
                  <HeaderTypo variant="h5" onClick={()=>navigate("/about")}>About Us</HeaderTypo>
                  <HeaderTypo variant="h5" onClick={()=>navigate("/profile")}>Profile</HeaderTypo>
                </FlexStack>
                {
                  sign ?
                      (
                        <IconButton>
                          <AccountCircleRounded sx={{color:'white'}} fontSize='large'/>
                        </IconButton>
                      ):
                      (
                        lgSize ? 
                        (
                          <>
                            <IconButton onClick={()=>setOpen(true)}>
                              <LoginIcon/>
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
                              <MenuItem onClick={()=>navigate("/login")}>Login</MenuItem>
                              <MenuItem onClick={()=>navigate("/signup")}>Sing Up</MenuItem>
                            </Menu>
                          </>
                        ) :
                        (
                          <Box className={`flex-end ${styles.btns}`}>
                            <Button>Log in</Button>
                            <Button>Sign Up</Button>
                          </Box>
                        )
                      )
                }
              </>
            )
          }
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
