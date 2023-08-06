//MUI
import { Button } from "@mui/material";

//Style
import styled from "@emotion/styled"

export const MyButton = styled(Button)(({theme})=>({
    background:"var(--linear_gradient)",
    color:"var(--white)",
    fontSize:"18px",
    width:"fit-content",
    paddingLeft:"20px",
    paddingRight:"20px",
    transition:"var(--trans)",
    position:"relative",
    borderRadius:"30px",
    overflow:"hidden",
    zIndex: 0,
    padding:"10px 20px !important",
    "&:hover":{
        background:"var(--linear_gradient_hover)"
    },
    "&:before":{
        content:'""',
        position: "absolute",
        background:"var(--linear_gradient_hover)",
        width:"110%",
        height:"110%",
        zIndex:-1,
        borderRadius:"30px",
        top:"50%",
        transition:"var(--trans)",
        transform:"translateY(-50%) translateX(-100%)",
    },
    "&:hover:before":{
        transform:"translateY(-50%) translateX(0%)",
    },
    [theme.breakpoints.down("md")]:{
        fontSize:"16px",
        padding:"8px 15px !important"
    },
    [theme.breakpoints.down("sm")]:{
        padding:"8px 12px !important",
        fontSize:"14px"
    }
}))