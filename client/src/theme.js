import {createTheme}  from "@mui/material"

export const theme = createTheme({
    palette:{
        primary:{
            main:"#007bff"
        },
        secondary:{
            main:"#6c757d"
        },
        success:{
            main:"#28a745"
        },
        info:{
            main:"#17a2b8"
        },
        warning:{
            main:"#ffc107"
        },
        error:{
            main:"#dc3545"
        },
    },
    breakpoints:{
        xs:{
            width: "0px",
        },
        sm:{
            width:"576px",
        },
        md:{
            width:"768px",
        },
        lg:{
            width:"992px",
        },
        xl:{
            width:"1200px",
        }
    }
})