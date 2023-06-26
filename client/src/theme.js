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

theme.typography.h1 = {
    fontSize: '4rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '3.5rem',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '2.5rem',
    },
};

theme.typography.h2 = {
    fontSize: '3rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '2.5rem',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '2.3rem',
    },
    [theme.breakpoints.down('xm')]: {
        fontSize: '2rem',
    },
};

theme.typography.h3 = {
    fontSize: '2rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.8rem',
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
        fontSize: '1.2rem',
    },
    [theme.breakpoints.down('xm')]: {
        fontSize: '1.1rem',
    },
};

theme.typography.h5 = {
    fontSize: '1.1rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.1rem',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
    },
    [theme.breakpoints.down('xm')]: {
        fontSize: '0.9rem',
    },
};

theme.typography.h6 = {
    fontSize: '1rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.8rem',
    },
    [theme.breakpoints.down('xm')]: {
        fontSize: '0.7rem',
    },
};

export default theme