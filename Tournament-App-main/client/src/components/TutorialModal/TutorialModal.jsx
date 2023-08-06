import React from 'react'
import {Box, IconButton, Modal} from '@mui/material'
import Head from "../Head/Head"
import HowToAddTournament from "./HowToAddTournament/HowToAddTournament"
import HowToPointsTournament from "./HowToTournaments/HowToPointsTournament/HowToPointsTournament"
import HowToBracketsTournament from "./HowToTournaments/HowToBracketsTournament/HowToBracketTournament"
import styles from "./TutorialModal.module.css"
import { CloseRounded } from '@mui/icons-material'
import axios from 'axios'
import Cookies from 'js-cookie'
 
const TutorialModal = () => {
  const [open, setOpen] = React.useState(true);
  
  const handleClose = async () => {
    setOpen(false)
    await axios.post(process.env.REACT_APP_SERVER_URL+"/FinishedTutorial",{},{
      withCredentials:true
    }).then((res)=>{
      let userData = JSON.parse(Cookies.get("user_data"))
      userData.tutorial = false
      Cookies.set("user_data", JSON.stringify(userData))
    }).catch((err)=>{
      console.log(err)
    })
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={`grid-center ${styles.tutorial_modal}`}>
        <IconButton onClick={handleClose} className={styles.close_icon}>
          <CloseRounded/>
        </IconButton>
        <Box className={`grid-center ${styles.tutorial_content}`}>
          <Head h={"h2"} align={"center"} title={"Tutorial"} />
          <HowToAddTournament/>
          <HowToPointsTournament/>
          <HowToBracketsTournament/>
        </Box>
        {/* <Button onClick={handleFinishTutorial}>Don't show me This Again</Button> */}
      </Box>
    </Modal>
  )
}

export default TutorialModal
