import React, { useCallback, useEffect, useRef, useState } from 'react'
import {MyBox} from "../../components/MyBox/MyBox"
import { Box, Container, Typography } from '@mui/material'
import styles from "./Graph.module.css"
import {useParams } from 'react-router-dom';
import axios from "axios"
import Round from '../../components/Round/Round';

const Graph = () => {
    const {tournamentId} = useParams()
    const [game, setGame] = useState([])
    const [max , setMax] = useState(4)
    let c = 100

    const handleDisplayGraph = useCallback(
        async()=>{
            await axios.post(process.env.REACT_APP_SERVER_URL+`/displayGraph/${tournamentId}`,{},{
                withCredentials:true
            }).then((res)=>{
                let c=0;
                const data = res.data.data
                let rounds = []
                data.map((d)=>{
                    if(d.round === 1){
                        c++
                    }
                })
                setMax(c)
                new Array(Math.log2(c*2)).fill(0).map(()=>{
                    rounds.push([])
                })
                data.map((d)=>{
                    rounds[d.round-1].push(d)
                })
                setGame(rounds)
            }).catch((err)=>{
                console.log(err)
            })
        },[tournamentId]
    )

    useEffect(()=>{
        handleDisplayGraph()
    },[handleDisplayGraph])

    return (
        <MyBox className={`${styles.graph}`}>
            <Container className={`grid-stretch ${styles.graph_contain}`}>
                <Typography variant='h2' className={`tac`}>Tournament Graph</Typography>
                <Box className={`${styles.match}`}>
                    {
                        max && game && (
                            <Box sx={{height:`${max * 110 + max * 100 + 50}px`}} className={`flex-start`}>
                                {
                                    game.map((g, i)=>{
                                        let padding = 100
                                        const round = i+1
                                        const players = max*2
                                        if(i > 0){
                                            let x = (players * 2 * 110) + ((players *2 - 1) * c)
                                            padding = (x - c - 110 - (110*players))/(players-1) 
                                            c = padding
                                        }
                                        return(
                                            <Round key={i} max={max} padding={padding} matches={g} round={round}/>
                                        )
                                    })
                                }
                            </Box>
                        )
                    }
                    {/* <Box className={`grid-stretch`} sx={{minWidth:`${num.length*300}px`}}>
                        <Box className={`grid-stretch ${styles.titles}`} sx={{gridTemplateColumns:`repeat(${num.length},1fr)`}}>
                            {
                                num.map((e,i)=>{
                                    return(
                                        <Box className={`${styles.title}`}>
                                            <Typography className={`tac`} variant='h5'>{`Round ${i+1}`}</Typography>
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                        <Box className={`grid-stretch ${styles.tournament}`} sx={{gridTemplateColumns:`repeat(${num.length},1fr)`}}>
                            {
                                num.map(()=>{
                                    const matches = new Array(c).fill(0) 
                                    c = c/2
                                    return (
                                        <Box className={`grid-stretch ${styles.level}`}>
                                            {
                                                matches.map(()=>{
                                                    return(
                                                        <Match/>
                                                    )
                                                })
                                            }
                                        </Box>
                                    )  
                                })
                            }
                        </Box>
                    </Box> */}
                </Box>
            </Container>
        </MyBox>
    )
}

export default Graph
