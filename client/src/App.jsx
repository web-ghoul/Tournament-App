import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom"
import Cookies from 'js-cookie';
import {setUserData } from './store/slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Components
import Footer from "./components/Footer/Footer.jsx"
import Header from "./components/Header/Header"
import ScrollUp from './components/ScrollUp/ScrollUp';
import TutorialModal from "./components/TutorialModal/TutorialModal"

//MUI
import {Box} from '@mui/material'
import { ThemeProvider } from '@emotion/react';
import theme from "./theme.js"

//Style
import "./index.css"

export const handleToastMessage = (msg , state , position = "top-right") =>{
  if(state === "s"){
      toast.success(msg, {
          position: position,
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
  }else if(state === "w"){
      toast.warn(msg, {
          position: position,
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
  }else if(state === "i"){
      toast.info(msg, {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
  }else{
      toast.error(msg, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
  }
} 

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const {id, unique} = useParams()
  const dispatch = useDispatch()
  const {tutorial}  = useSelector((state)=>state.auth)
  useEffect(()=>{
    let userData = Cookies.get('user_data')
    if(userData){
      userData = JSON.parse(userData)
      dispatch(setUserData({username:userData.username , token:userData.token,role:userData.role, tutorial:userData.tutorial}))
    }else{
      if(location.pathname.split("/")[1] === "tournament" || location.pathname.split("/")[1] === "profile"){
        navigate("/")
      }
    }
  },[dispatch, navigate,location])
  return (
    <ThemeProvider theme={theme}>
      <Box component={"main"}>
          {(location.pathname === process.env.REACT_APP_LOGIN_PAGE || location.pathname === process.env.REACT_APP_SIGNUP_PAGE || location.pathname === process.env.REACT_APP_FORGOT_PASS_PAGE || location.pathname === `/reset_password/${id}/${unique}` || location.pathname === `/verify/${id}/${unique}`) ? <></> : <Header/>}
          <Outlet/>
          {
            tutorial && 
            <TutorialModal/>
          }
          <ScrollUp/>
          <ToastContainer/>
          {(location.pathname === process.env.REACT_APP_LOGIN_PAGE || location.pathname === process.env.REACT_APP_SIGNUP_PAGE  || location.pathname === process.env.REACT_APP_FORGOT_PASS_PAGE || location.pathname === `/reset_password/${id}/${unique}` || location.pathname === `/verify/${id}/${unique}`) ? <></> : <Footer/>}
      </Box>
    </ThemeProvider>
  );
}

export default App;
