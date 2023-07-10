import {Box} from '@mui/material'
import {Outlet, useLocation, useParams} from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer.jsx"
import { ThemeProvider } from '@emotion/react';
import theme from "./theme.js"
import "./index.css"
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setUserData } from './store/authSlice';
import ScrollUp from './components/ScrollUp/ScrollUp';

function App() {
  const location = useLocation()
  const dispatch = useDispatch()
  let userData = Cookies.get('user_data')
  const {id, unique} = useParams()
  if(userData){
    userData = JSON.parse(userData)
    dispatch(setUserData(userData))
  }
  return (
    <ThemeProvider theme={theme}>
      <Box component={"main"}>
          {(location.pathname === process.env.REACT_APP_LOGIN_PAGE || location.pathname === process.env.REACT_APP_SIGNUP_PAGE || location.pathname === process.env.REACT_APP_FORGOT_PASS_PAGE ||location.pathname === `/reset_password/${id}/${unique}`) ? <></> : <Header/>}
          <Outlet/>
          <ScrollUp/>
          {(location.pathname === process.env.REACT_APP_LOGIN_PAGE || location.pathname === process.env.REACT_APP_SIGNUP_PAGE  || location.pathname === process.env.REACT_APP_FORGOT_PASS_PAGE || location.pathname === `/reset_password/${id}/${unique}` ) ? <></> : <Footer/>}
      </Box>
    </ThemeProvider>
  );
}

export default App;
