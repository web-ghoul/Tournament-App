import {Box} from '@mui/material'
import {Outlet, useLocation} from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer.jsx"
import { ThemeProvider } from '@emotion/react';
import theme from "./theme.js"
import "./index.css"

function App() {
  const location = useLocation()
  return (
    <ThemeProvider theme={theme}>
      <Box component={"main"}>
          {(location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/forgot_password" ||location.pathname === "/reset_password") ? <></> : <Header/>}
          <Outlet/>
          {(location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/forgot_password" ||location.pathname === "/reset_password" ) ? <></> : <Footer/>}
      </Box>
    </ThemeProvider>
  );
}

export default App;
