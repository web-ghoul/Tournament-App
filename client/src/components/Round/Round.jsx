import { Box, Typography } from '@mui/material'
import React from 'react'
import Match from '../Match/Match'
import styles from "./Round.module.css"

const Round = ({padding,max,matches ,round}) => {
    if(matches.length > 0 && matches[0].round !== 1 && matches.length !== max/((matches[0].round-1)*2) ){
        new Array((max/((matches[0].round-1)*2)) - matches.length).fill(0).map(()=>{
            matches.push({})
        })
    }
    return (
        <Box sx={{height:`${max*110 + (max-1)*100 + 140}px`}} className={`flex-center ${styles.round}`}>
            <Typography variant='h5'>{`Round ${round}`}</Typography>
            <Box className={`grid-center ${styles.matches}`} sx={{gap:`${padding}px`}}>
            
            {
                matches.length === 0 ?
                    new Array(max/((round-1)*2)).fill(0).map((match,i)=>{
                        if(i % 2 === 0){
                            return(
                                <Match waiting1={true} waiting2={true} h = {padding/2 + 26.5} last={true} match={match} key={i} dir={"top"}/>
                            )
                        }else{
                            return(
                                <Match waiting1={true} waiting2={true} h = {padding/2 + 26.5} match={match} key={i} dir={"bottom"}/>
                            )
                        }
                    }): 
                    matches.map((match,i)=>{
                        if(i % 2 === 0){
                            if(Object.keys(match).length === 0){
                                return(
                                    <Match waiting1={true} waiting2={true} h = {padding/2 + 26.5} last={true} match={match} key={i} dir={"top"}/>
                                )
                            }
                            if(matches.length === 1){
                                return(
                                    <Match h = {padding/2 + 26.5} last={true} match={match} key={i} dir={"top"}/>
                                )
                            }
                            return(
                                <Match h = {padding/2 + 26.5} last={false} match={match} key={i} dir={"top"}/>
                            )
                        }else{
                            if(Object.keys(match).length === 0){
                                return(
                                    <Match waiting1={true} waiting2={true} h = {padding/2 + 26.5} match={match} key={i} dir={"bottom"}/>
                                )
                            }
                            return(
                                <Match h = {padding/2 + 26.5} match={match} key={i} dir={"bottom"}/>
                            )
                        }
                    })
            }
            </Box>
        </Box>
    )
}

export default Round
