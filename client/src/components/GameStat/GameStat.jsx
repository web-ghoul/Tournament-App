import React, { useState } from 'react'

//MUI
import { Box, Button, Typography } from '@mui/material'
import {TrendingUpRounded,SportsEsportsRounded,ThumbsUpDownRounded} from '@mui/icons-material';

//Style
import styles from "./GameStat.module.css"

const GameStat = ({perfs, count}) => {
    const [statType , setStatType] = useState("blitz")
    return (
        <Box className={`grid-stretch ${styles.game_stat}`}>
            <Box className={`grid-start ${styles.title}`}>
                <Typography variant='h4' className={`game-font text-upper`}>Game Statistics</Typography>
                <Typography variant="h5">Player's game specific statistics</Typography>
            </Box>
            <Box className={`grid-stretch ${styles.stat}`}>
                <Box className={`flex-start ${styles.types}`}>
                    {
                        perfs && Object.keys(perfs).map((k,i)=>{
                            return (<Button key={i} onClick={()=>setStatType(k.toLowerCase())} className= {`text-upper ${k.toLowerCase() === statType ? styles.active : styles.colored}`}>{k}</Button>)
                        })
                    }
                </Box>
                <Box className={`grid-stretch ${styles.boxes}`}>
                    {
                        perfs 
                        && 
                        <>
                            <Box className={`grid-center ${styles.box}`}>
                                <SportsEsportsRounded className={`${styles.icon}`}/>
                                <Typography variant='h4' className='game-font text-upper text-center'>Games</Typography>
                                <Typography variant='h4' className='game-font text-center'>{perfs[statType].games}</Typography>
                            </Box>
                            <Box className={`grid-center ${styles.box}`}>
                                <ThumbsUpDownRounded className={`${styles.icon}`}/>
                                <Typography variant='h4' className='game-font text-upper text-center'>Rating</Typography>
                                <Typography variant='h4' className='game-font text-center'>{perfs[statType].rating}</Typography>
                            </Box>
                            <Box className={`grid-center ${styles.box}`}>
                                <TrendingUpRounded className={`${styles.icon}`}/>
                                <Typography variant='h4' className='game-font text-upper text-center'>Rating Deviation</Typography>
                                <Typography variant='h4' className='game-font text-center'>{perfs[statType].rd}</Typography>
                            </Box>
                        </>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default GameStat
