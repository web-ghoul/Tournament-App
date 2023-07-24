//MUI
import { Box } from '@mui/material'

//Style
import styled from '@emotion/styled'

export const MyBox = styled(Box)(({theme})=>(
    {
        paddingBottom:"100px",
        paddingTop:"100px",
        [theme.breakpoints.down("md")]:{
            paddingBottom:"75px",
        },
        [theme.breakpoints.down("sm")]:{
            paddingBottom:"50px",
        }
    }
))