import { Box, Typography } from '@mui/material'
import React from 'react'
import styles from "./Head.module.css"

const Head = ({title,description,gap, h, align , line}) => {
  return (
    <Box sx={{gap : `${gap && gap}px`}} className={`${align === "center" ? "grid-center" : "grid-start"}`} >
        <Typography variant={h}   sx={{textAlign:align}} className={`${line && styles.line} game-font text-upper`}>{title}</Typography>
        <Typography align={align} className={`${align === "center" && "el-center-x"} para`}  sx={{textAlign:align,fontWeight:"normal"}} variant="h4">{description}</Typography>
    </Box>
  )
}

export default Head
