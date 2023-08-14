import React from 'react'

//Component
import Round from './Round/Round'

//MUI
import { Box, Typography } from '@mui/material'

//Style
import styles from "./Bracket.module.css"

const Bracket = ({nodes , max,isLoading}) => {
    var pad=100
    return (
        <Box className={`flex-stretch ${styles.match}`}>
            {
                isLoading ? (
                    <>
                        <Typography variant='h3' className={"tac"}>Loading...</Typography>
                    </>
                ):
                (
                    <Box sx={{height:`${max * 110 + max * 100 + 40}px`}} className={`flex-center ${styles.match_contain}`}>
                        {
                            nodes.map((g, i)=>{
                                let padding = 100
                                const round = i+1
                                const players = max*2
                                if(i > 0){
                                    let x = (players * 2 * 110) + ((players *2 - 1) * pad)
                                    padding = (x - pad - 110 - (110*players))/(players-1) 
                                    pad = padding
                                }
                                return(
                                    <Round key={i} max={max} padding={padding} matches={g} round={round}/>
                                )
                            })
                        }
                    </Box>
                )
            }
        </Box>
    )
}

export default Bracket
