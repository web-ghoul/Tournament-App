<<<<<<< HEAD
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
=======
import React, { useCallback, useEffect, useState } from 'react'
import {MyBox} from "../../components/MyBox/MyBox"
import { Box, Container, Typography } from '@mui/material'
import styles from "./Graph.module.css"
// import Match from '../../components/Match/Match'
import {Bracket,BracketGame} from "react-tournament-bracket";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios"
import Match from '../../components/Match/Match';

const Graph = () => {
    // const num = new Array(Math.log2(members)).fill(0)
    // let c = members/2
    const navigate = useNavigate()
    const {id} = useParams()
    const [graph , setGraph] = useState([])
    const [games, setGames] = useState([])

    const handleDisplayGraph = useCallback(async()=>{
        await axios.post(process.env.REACT_APP_SERVER_URL+`/displayGraph/${id}`,{},{
            withCredentials:true
        }).then((res)=>{
            setGraph(res.data.data)
            const data = res.data.data
            let matches=[]
            data.map((d)=>{
                const game={
                    id:d.gameID,
                    name: `Round ${d.round}`,
                    scheduled: Number(new Date()),
                    sides: {
                        home: {
                            team: {
                                id: d.userName1,
                                name: d.userName1
                            },
                        },
                        visitor: {
                            team: {
                                id: d.userName2,
                                name: d.userName2
                            },
                        }
                    }
                }
                matches.push(game)
            })
            setGames(matches)
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    
    useEffect(()=>{
        handleDisplayGraph()
    },[])

    return (
        <MyBox>
            <Container className={`grid-stretch ${styles.graph_contain}`}>
                <Typography variant='h2' className={`tac`}>Tournament Graph</Typography>
                <Box className={` grid-start ${styles.graph}`}>
                    {/* {
                        games.length > 0 && (
                            games.map((g,i)=>(
                                <Match key={i} game={g}/>
                            ))
                        ) 
                    } */}
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
>>>>>>> 212162d2f875d71fffb8130d5eff55f2d752d3ff
