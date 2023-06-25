import styled from "@emotion/styled";
import { Button } from "@mui/material";



export const MyButton = styled(Button)({
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
    }
})