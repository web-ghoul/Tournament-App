import styled from '@emotion/styled'
import { Box } from '@mui/material'

export const MyBox = styled(Box)(({theme})=>(
    {
        paddingBottom:"40px",
        paddingTop:"40px",
        [theme.breakpoints.down("md")]:{
            paddingBottom:"30px",
            paddingTop:"30px",
        },
        [theme.breakpoints.down("sm")]:{
            paddingBottom:"20px",
            paddingTop:"20px",
        }
    }
))