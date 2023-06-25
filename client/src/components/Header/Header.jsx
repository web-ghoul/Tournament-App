import { AppBar, Container, Toolbar, IconButton } from '@mui/material'
import {AccountCircleRounded} from "@mui/icons-material"
import React from 'react'
import {useNavigate} from "react-router-dom"
import {FlexStack} from "../FlexStack/FlexStack"
import Logo from '../Logo/Logo'
import { HeaderTypo } from '../HeaderTypo/HeaderTypo'

const Header = () => {
  const navigate = useNavigate()
  return (
    <AppBar position="static">
      <Container>
        <Toolbar className="flex-between">
          <Logo/>
          <FlexStack gap={5}>
            <HeaderTypo variant="h6" onClick={()=>navigate("/")}>Home</HeaderTypo>
            <HeaderTypo variant="h6" onClick={()=>navigate("#tournaments")}>Tournaments</HeaderTypo>
            <HeaderTypo variant="h6" onClick={()=>navigate("/about")}>About Us</HeaderTypo>
            <HeaderTypo variant="h6" onClick={()=>navigate("/profile")}>Profile</HeaderTypo>
          </FlexStack>
          <IconButton>
            <AccountCircleRounded sx={{color:'white'}} fontSize='large'/>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
