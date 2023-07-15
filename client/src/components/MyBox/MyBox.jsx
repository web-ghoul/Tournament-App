import styled from '@emotion/styled'
import { Box } from '@mui/material'

export const MyBox = styled(Box)(({theme})=>(
    {
        paddingBottom:"100px",
        paddingTop:"100px",
        [theme.breakpoints.down("md")]:{
            paddingBottom:"75px",
            paddingTop:"75px",
        },
        [theme.breakpoints.down("sm")]:{
            paddingBottom:"100px",
            paddingTop:"50px",
        }
    }
))