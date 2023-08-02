import { Box,Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import {getPoints} from "../../../store/slices/pointsSlice"
import React from 'react'
import styles from "./PlayerTable.module.css"
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios"
import {handleToastMessage} from "../../../App"
import { useParams } from 'react-router-dom';

const PlayerTable = ({data}) => {
    const dispatch = useDispatch()

    const {tournamentId, finished} = useParams()

    const {username} = useSelector((state)=>state.auth)

    const playerData = data.filter((d)=>d.Name === username)[0]

    const handleEnterMatch = async(gameLink, game_Id)=>{
        await axios.post(process.env.REACT_APP_SERVER_URL+`/PointsGameEntered/${game_Id}`,{},{
            withCredentials:true
        }).then((res)=>{
            window.open(gameLink, "_blank")
        }).catch((err)=>{
            handleToastMessage(err.response.data.message, "e")
        })
    }

    const handleAbort = async(game_id)=>{
        await axios.post(process.env.REACT_APP_SERVER_URL+`/PointsAbortMatch/${game_id}`,{},{
            withCredentials:true
        }).then((res)=>{
            if(playerData.Matches[playerData.Matches.length-1].gameID === game_id){
                dispatch(getPoints({tournamentId, finished:"true"}))
            }else{
                dispatch(getPoints({tournamentId, finished:"false"}))
            }
            handleToastMessage(res.data.message, "s")
        }).catch((err)=>{
            handleToastMessage(err.response.data.message, "e")
        })
    }

    const handleFinish = async(game_id)=>{
        await axios.post(process.env.REACT_APP_SERVER_URL+`/PointsNode/${game_id}`,{},{
            withCredentials:true
        }).then((res)=>{
            if(playerData.Matches[playerData.Matches.length-1].gameID === game_id){
                dispatch(getPoints({tournamentId, finished:"true"}))
            }else{
                dispatch(getPoints({tournamentId, finished:"false"}))
            }
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
                                        <Button onClick={()=>handleEnterMatch(match.gameLink, match.gameID)}>
                                            Match
                                        </Button>
                                        <Button onClick={()=>handleAbort(match.gameID)} className={`${styles.abort}`}>
                                            Abort
                                        </Button>
                                        <Button onClick={()=>handleFinish(match.gameID)} className={`${styles.finish}`}>
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
