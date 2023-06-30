import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import styles from "./GameStat.module.css"
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import ThumbsUpDownRoundedIcon from '@mui/icons-material/ThumbsUpDownRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';

const GameStat = ({perfs, count}) => {
    console.log(perfs,count)
    const [statType , setStatType] = useState("blitz")
    return (
        <Box className={`grid-stretch ${styles.game_stat}`}>
            <Box className={`grid-start ${styles.title}`}>
                <Typography variant='h4' className={`game-font text-upper`}>Game Statistics</Typography>
                <Typography variant="h6">Player's game specific statistics</Typography>
            </Box>
            <Box className={`grid-stretch ${styles.stat}`}>
                <Box className={`flex-start ${styles.types}`}>
                    {
                        perfs && Object.keys(perfs).map((k)=>{
                            console.log(k.toLowerCase())
                            return (<Button onClick={()=>setStatType(k.toLowerCase())} className= {`text-upper ${k.toLowerCase() === statType ? styles.active : styles.colored}`}>{k}</Button>)
                        })
                    }
                </Box>
                <Box className={`grid-stretch ${styles.boxes}`}>
                    {
                        perfs 
                        && 
                        <>
                            <Box className={`grid-center ${styles.box}`}>
                                <SportsEsportsRoundedIcon className={`${styles.icon}`}/>
                                <Typography variant='h4' className='game-font text-upper text-center'>Games</Typography>
                                <Typography variant='h4' className='game-font text-center'>{perfs[statType].games}</Typography>
                            </Box>
                            <Box className={`grid-center ${styles.box}`}>
                                <ThumbsUpDownRoundedIcon className={`${styles.icon}`}/>
                                <Typography variant='h4' className='game-font text-upper text-center'>Rating</Typography>
                                <Typography variant='h4' className='game-font text-center'>{perfs[statType].rating}</Typography>
                            </Box>
                            <Box className={`grid-center ${styles.box}`}>
                                <TrendingUpRoundedIcon className={`${styles.icon}`}/>
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
