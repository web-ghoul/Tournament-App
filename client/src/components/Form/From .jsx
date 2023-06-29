import React, { useState } from 'react'
import styles from "./Form.module.css"
import Box from '@mui/material/Box'
import { Button, Container, IconButton, InputLabel, TextField, Typography, FormControlLabel, Radio } from '@mui/material'
import Logo from "../../components/Logo/Logo"
import {MyBox} from "../../components/MyBox/MyBox"
import {MyButton} from "../../components/MyButton/MyButton"
import {Formik , Field} from "formik"
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'

const registerSchema = Yup.object().shape({
    email:Yup.string().email().required(),
    username:Yup.string().required(),
    password:Yup.string().required(),
})

const loginSchema = Yup.object().shape({
    email:Yup.string().email().required(),
    password:Yup.string().required(),
})

const initialLoginValues = {
    email:"",
    password:""
}

const initialRegisterValues = {
    email:"",
    username:"",
    password:""
}

const handleSubmitForm = (values, onSubmitProps)=>{
    alert(JSON.stringify(values))
    onSubmitProps.resetForm()
}

const From  = (props) => {
    const navigate = useNavigate() 
    const isLogin = props.formType === "login"
    const isRegister = props.formType === "register"
    return (
        <Formik
            initialValues={isLogin ? initialLoginValues : initialRegisterValues}
            validationSchema={isLogin ? loginSchema : registerSchema}
            className={`flex-center`}
            onSubmit={handleSubmitForm}
        >
            {({values,errors, touched , handleSubmit , handleBlur,handleChange,isSubmitting, resetForm})=>(
            <form component="form" className={`grid-stretch ${styles.form}`} onSubmit={handleSubmit}>
                {
                    isLogin ? (
                        <Typography variant='h3' className={`text-center game-font flex-center`}>Welcome To Tournament</Typography>
                    ):(
                        <Typography variant='h3' className={`text-center game-font flex-center`}>Let's get started</Typography>
                    )
                }
                <TextField className={`grid-stretch ${styles.email}`} label="Email" name='email' value={values.email} onChange={handleChange} id="email" error={Boolean(touched.email) && Boolean(errors.email)} helperText={touched.email && errors.email} onBlur={handleBlur}/>
                {
                    isRegister && (
                        <TextField className={`grid-stretch ${styles.username}`} label="Username" value={values.username} error={Boolean(touched.username) && Boolean(errors.username)} name='username' type="username" onChange={handleChange} id="username" helperText={touched.username && errors.username} onBlur={handleBlur}/>
                    )
                }
                <TextField className={`grid-stretch ${styles.pass}`} label="Password" error={Boolean(touched.password) && Boolean(errors.password)} name='password' type="password" value={values.password} onChange={handleChange} id="password" helperText={touched.password && errors.password} onBlur={handleBlur}/>
                {
                    isLogin && (
                        <Box className={`flex-start ${styles.forgot}`}>
                            <Typography variant='h6'>Forgot your password?</Typography>
                            {/*onClick Wait Till End*/}
                            <Button>Recover Password</Button>
                        </Box>
                    )
                }
                <Box className={`flex-center ${styles.btn}`}>
                    {/*onClick Wait Till End*/}
                    <MyButton type="submit">{isRegister ? "Sign Up" : "Sign In"}</MyButton>
                </Box>
                {
                    isLogin ? (
                        <Box className={`flex-center ${styles.have_acc}`}>
                            <Typography variant='h5'>Don't have an account?</Typography>
                            <Button onClick={()=>navigate(process.env.REACT_APP_SIGNUP_PAGE)}>Sign Up Here</Button>
                        </Box>
                    ):(
                        <Box className={`flex-center ${styles.have_acc}`}>
                            <Typography variant='h5'>Already have an account?</Typography>
                            <Button onClick={()=>navigate(process.env.REACT_APP_LOGIN_PAGE)}>Sign In</Button>
                        </Box>
                    )
                }
            </form>
            )}
        </Formik>
    )
}

export default From 
