import {Box} from '@mui/material'
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer.jsx"
import { ThemeProvider } from '@emotion/react';
import theme from "./theme.js"
import "./index.css"
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setData, setUserData } from './store/authSlice';
import ScrollUp from './components/ScrollUp/ScrollUp';
import {  useEffect } from 'react';

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const {id, unique} = useParams()
  const dispatch = useDispatch()
  
  useEffect(()=>{
    let userData = Cookies.get('user_data')
    if(userData){
      userData = JSON.parse(userData)
      dispatch(setUserData({username:userData.username}))
    }else{
      if(location.pathname === process.env.REACT_APP_TOURNAMENTS_PAGE || location.pathname === process.env.REACT_APP_PROFILE_PAGE ||location.pathname === process.env.REACT_APP_ABOUT_PAGE){
        navigate("/")
      }
    }
  },[dispatch, navigate,location])
  
  return (
    <ThemeProvider theme={theme}>
      <Box component={"main"}>
          {(location.pathname === process.env.REACT_APP_LOGIN_PAGE || location.pathname === process.env.REACT_APP_SIGNUP_PAGE || location.pathname === process.env.REACT_APP_FORGOT_PASS_PAGE || location.pathname === `/reset_password/${id}/${unique}` || location.pathname === `/verify/${id}/${unique}`) ? <></> : <Header/>}
          <Outlet/>
          <ScrollUp/>
          {(location.pathname === process.env.REACT_APP_LOGIN_PAGE || location.pathname === process.env.REACT_APP_SIGNUP_PAGE  || location.pathname === process.env.REACT_APP_FORGOT_PASS_PAGE || location.pathname === `/reset_password/${id}/${unique}` || location.pathname === `/verify/${id}/${unique}`) ? <></> : <Footer/>}
      </Box>
    </ThemeProvider>
  );
}

export default App;
