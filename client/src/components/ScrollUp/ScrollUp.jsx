import React from 'react'
import { useSelector } from 'react-redux';

//MUI
import {KeyboardDoubleArrowUpRounded} from '@mui/icons-material';
import {Box} from "@mui/material"

//Style
import styles from "./ScrollUp.module.css"

const ScrollUp = () => {
    const hide = useSelector((state)=>state.scroll.hide)
    const handleScroll = ()=>{
        window.scrollTo(
            {
                top:0,
                behavior:"smooth"
            }
        )
    }

    return (
        <Box onClick={()=>handleScroll()} className={hide ? `flex-center ${styles.scroll_up} ${styles.hide}`: `flex-center ${styles.scroll_up}`}>
            <KeyboardDoubleArrowUpRounded/>
        </Box>
    )
}

export default ScrollUp
