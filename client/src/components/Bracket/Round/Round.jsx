import { Box, Typography } from '@mui/material'
import React from 'react'
import Match from '../Match/Match'
import styles from "./Round.module.css"

const Round = ({padding,max,matches ,round}) => {
    var l = round === 1 ? max :  max/((round-1)*2 )
    var newMatches=[]
    new Array(l).fill(0).map(()=>newMatches.push({}))
    matches.map((m)=>newMatches[m.nodeNumber-1] = m)
    return (
        <Box sx={{height:`${max*110 + (max-1)*100 + 140}px`}} className={`grid-center ${styles.round}`}>
            <Typography className={`${(max === 1 || (round !== 1 && max / ((round-1)*2) ===1)) && styles.last_round}`} variant='h5'>{`Round ${round}`}</Typography>
            <Box className={`grid-center ${styles.matches}`} sx={{gap:`${padding}px`}}>
            {
                newMatches.map((match,i)=>{
                    var dir = "top";
                    var waiting1 = false
                    var waiting2 = false
                    var height = padding/2 + 26.5
                    var last = false
                    if(!match.hasOwnProperty("userName1")){
                        waiting1 = true
                    }
                    if(!match.hasOwnProperty("userName2")){
                        waiting2 = true
                    }
                    if(newMatches.length === 1){
                        last = true
                    }
                    if(i% 2 === 0){
                        dir = "top"
                    }else{
                        dir="bottom"
                    }
                    return <Match waiting1={waiting1} waiting2={waiting2} h = {height} match={match} last={last} key={i} dir={dir}/>
                })
            }
            </Box>
        </Box>
    )
}

export default Round
