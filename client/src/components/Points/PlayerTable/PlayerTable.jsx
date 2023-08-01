import { Box,Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import React from 'react'
import styles from "./PlayerTable.module.css"
import { useSelector } from 'react-redux';
import axios from "axios"
import {handleToastMessage} from "../../../App"

const PlayerTable = ({data}) => {
    const {username} = useSelector((state)=>state.auth)

    const playerData = data.filter((d)=>d.Name === username)[0]
    console.log(playerData._id)

    const handleEnterMatch = async(gameLink)=>{
        await axios.post(process.env.REACT_APP_SERVER_URL+`/GameEntered/${playerData._id}`,{},{
            withCredentials:true
        }).then((res)=>{
          window.open(gameLink, "_blank")
        }).catch((err)=>{
            handleToastMessage(err.response.data.message, "e")
        })
    }

    const handleAbort = ()=>{
    }

    const handleFinish = async(game_link)=>{
        await axios.post(process.env.REACT_APP_SERVER_URL+`/PointsNode/${game_link}/1`,{},{
            withCredentials:true
        }).then((res)=>{
            handleToastMessage(res.data.message,"s")
        }).catch((err)=>{
            handleToastMessage(err.response.data.message,"e")
        })
    }
    return (
        <TableContainer className={`${styles.table_contain}`} component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        {playerData.Matches.map((match) => (
                            <TableCell
                                key={match._id}
                                align={match.align}
                                style={{ minWidth: 200 }}
                            >
                                {`Round ${match.round}`}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody className={`${styles.points_body}`}>
                    <TableRow className={`${styles.table_cells}`}>
                    {
                        playerData.Matches.map((match) => (
                            <TableCell  
                                key={match._id}
                                align={match.align}
                                style={{ minWidth: 200 }}
                            >
                                <Box className={`grid-start ${styles.tbody_cell}`}>
                                    <Typography variant='h6'>play with <span>{match.Player}</span></Typography>
                                    <Box className={`flex-start ${styles.buttons}`}>
                                        <Button onClick={()=>handleEnterMatch(match.gameLink, playerData._id)}>
                                            Match
                                        </Button>
                                        <Button onClick={handleAbort} className={`${styles.abort}`}>
                                            Abort
                                        </Button>
                                        <Button onClick={()=>handleFinish(match._id)} className={`${styles.finish}`}>
                                            Finish
                                        </Button>
                                    </Box>
                                </Box>
                            </TableCell>
                        ))
                    }
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default PlayerTable
