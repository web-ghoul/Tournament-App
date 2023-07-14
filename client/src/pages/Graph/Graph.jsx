import React from 'react'
import {MyBox} from "../../components/MyBox/MyBox"
import { Box, Container, Typography } from '@mui/material'
import styles from "./Graph.module.css"
// import Match from '../../components/Match/Match'
import {Bracket} from "react-tournament-bracket";
const Graph = ({members}) => {
    const num = new Array(Math.log2(members)).fill(0)
    let c = members/2
    const game1 = {
        id: "1",
        name: "finals",
        scheduled: Number(new Date()),
        sides: {
            home: {
                team: {
                    id: "10",
                    name: "Team meu"
                },
                score: {
                    score: null
                },
            },
            visitor: {
                team: {
                    id: "11",
                    name: "Team pau"
                },
                score: {
                    score: null
                },
            }
        }
    };
    return (
        <MyBox>
            <Container className={`grid-stretch ${styles.graph_contain}`}>
                <Typography variant='h2' className={`tac`}>Tournament Graph</Typography>
                <Box className={`${styles.graph}`}>
                    <Bracket game={game1}/>
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
