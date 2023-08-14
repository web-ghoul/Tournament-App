import { Box,Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import {getPoints} from "../../../store/slices/pointsSlice"
import React from 'react'
import styles from "./PlayerTable.module.css"
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios"
import {handleToastMessage} from "../../../App"
import { useParams } from 'react-router-dom';
import winnerImg from "../../../static/images/winner.png"
import drawImg from "../../../static/images/draw.png"
import lossImg from "../../../static/images/lose.png"

const PlayerTable = ({data}) => {
    const dispatch = useDispatch()

    const {tournamentId} = useParams()

    const {username} = useSelector((state)=>state.auth)

    const {currentRound} = useSelector((state)=>state.points)

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
            if(currentRound === data.length){
                dispatch(getPoints(tournamentId))
            }else{
                dispatch(getPoints(tournamentId))
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
            handleToastMessage(res.data.message,"s")
        }).catch((err)=>{
            handleToastMessage(err.response.data.message,"e")
        })
        if(currentRound === data.length){
            dispatch(getPoints(tournamentId))
        }else{
            dispatch(getPoints(tournamentId))
        }
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
                        playerData.Matches.map((match,i) => {
                            return(
                                <TableCell  
                                    key={match._id}
                                    align={match.align}
                                    style={{ minWidth: 200 }}
                                    className={`${currentRound !== i+1 ? styles.disabled_cell :styles.able_cell} ${match.winner !== "*"?match.winner === "draw" ? styles.draw: match.winner === username ? styles.win:styles.loss:  ""}`}
                                >
                                    <Box className={`flex-between ${styles.tbody_cell}`}>
                                        <Box className={`grid-start ${styles.info_player}`}>
                                            <Typography variant='h6'>{match.winner === "*" ? "play with " : match.winner === "draw" ? "you draw with " : match.winner === username ? "you won " : "you lost from "}<span>{match.Player}</span></Typography>
                                            {
                                                true && (
                                                    <Box className={`flex-start ${styles.buttons}`}>
                                                        <Button disabled={currentRound < i+1} onClick={()=>handleEnterMatch(match.gameLink, match.gameID)}>
                                                            Match
                                                        </Button>
                                                        {
                                                            currentRound === i+1 && match.winner === "*" &&
                                                            (
                                                                <>
                                                                    <Button onClick={()=>handleAbort(match.gameID)} className={`${styles.abort}`}>
                                                                        Abort
                                                                    </Button>
                                                                    <Button onClick={()=>handleFinish(match.gameID)} className={`${styles.finish}`}>
                                                                        Finish
                                                                    </Button>
                                                                </>
                                                            )
                                                        }
                                                    </Box>
                                                )
                                            }   
                                        </Box>
                                        {
                                            match.winner !== "*" && (
                                                <Box className={`${styles.status_img}`}>
                                                    <Box component={"img"} alt="player status" src={match.winner === username ? winnerImg : match.winner === "draw" ? drawImg : lossImg} />
                                                </Box>
                                            )
                                        }
                                    </Box>
                                </TableCell>
                            )
                        })
                    }
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default PlayerTable
