import React from 'react'
import {Box} from "@mui/material"
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import styles from "./ScrollUp.module.css"
import { useSelector } from 'react-redux';

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
            <KeyboardDoubleArrowUpRoundedIcon/>
        </Box>
    )
}

export default ScrollUp
