import {createTheme}  from "@mui/material"



const theme = createTheme({
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
        white:"#fff"
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
    },
    direction:'ltr'
})

theme.typography.h1 = {
    fontSize: '3.8rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '3.2rem',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '2.4rem',
    },
};

theme.typography.h2 = {
    fontSize: '2.8rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '2.4rem',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '2.2rem',
    },
    [theme.breakpoints.down('xm')]: {
        fontSize: '1.8rem',
    },
};

theme.typography.h3 = {
    fontSize: '1.9rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.7rem',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem',
    },
    [theme.breakpoints.down('xm')]: {
        fontSize: '1.3rem',
    },
};

theme.typography.h4 = {
    fontSize: '1.5rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.3rem',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.1rem',
    },
    [theme.breakpoints.down('xm')]: {
        fontSize: '1rem',
    },
};

theme.typography.h5 = {
    fontSize: '1.1rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.1rem',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.9rem',
    },
    [theme.breakpoints.down('xm')]: {
        fontSize: '0.8rem',
    },
};

theme.typography.h6 = {
    fontSize: '1rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.7rem',
    },
    [theme.breakpoints.down('xm')]: {
        fontSize: '0.5rem',
    },
};

export default theme