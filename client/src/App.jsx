import {Box} from '@mui/material'
import {Outlet} from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer.jsx"
import { ThemeProvider } from '@emotion/react';
import {theme} from "./theme.js"
import "./index.css"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box component={"main"}>
          <Header/>
          <Outlet/>
          <Footer/>
      </Box>
    </ThemeProvider>
  );
}

export default App;
