import React, { useState } from 'react'
import "./Form.css"
import Box from '@mui/material/Box'
import { Button, Container, IconButton, InputLabel, TextField, Typography, FormControlLabel, Radio } from '@mui/material'
import Logo from "../../components/Logo/Logo"
import {MyBox} from "../../components/MyBox/MyBox"
import {MyButton} from "../../components/MyButton/MyButton"
import {Formik , Field} from "formik"
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import * as Yup from "yup"
import LoginForm from '../LoginForm/LoginForm'
import SignUpForm from '../SignUpForm/SignUpForm'
import ForgotPasswordForm from '../ForgotPasswordForm/ForgotPasswordForm'
import ResetPasswordForm from '../ResetPasswordForm/ResetPasswordForm'

const registerSchema = Yup.object().shape({
    email:Yup.string().email().required(),
    username:Yup.string().required(),
    password:Yup.string().required(),
})

const loginSchema = Yup.object().shape({
    email:Yup.string().email().required(),
    password:Yup.string().required(),
})

const resetPasswordSchema = Yup.object().shape({
    old_password:Yup.string().required().min(8),
    new_password:Yup.string().required().min(8).when("old_password", (old_password , field)=>old_password ? field.required() : field),
    confirm_password:Yup.string().required().min(8).when("new_password", (new_password , field)=> new_password ? field.required().oneOf([Yup.ref("new_password")]) : field),
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

const initialOResetPasswordValues = {
    old_password:"",
    new_password:"",
    confirm_password:"",
}

const handleSubmitForm = (values, onSubmitProps)=>{
    alert(JSON.stringify(values))
    onSubmitProps.resetForm()
}

const From  = (props) => {
    const isLogin = props.formType === "login"
    const isRegister = props.formType === "register"
    const isForgot_pass = props.formType === "forgot_pass"
    const isReset_pass = props.formType === "reset_pass"
    return (
        <Formik
            initialValues={isLogin ? initialLoginValues : isRegister ? initialRegisterValues : isReset_pass && initialOResetPasswordValues}
            validationSchema={isLogin ? loginSchema : isRegister ? registerSchema : isReset_pass && resetPasswordSchema}
            className={`flex-center`}
            onSubmit={handleSubmitForm}
        >
            {({values,errors, touched , handleSubmit , handleBlur,handleChange,isSubmitting, resetForm})=>(
            <form component="form" className={`grid-stretch form`} onSubmit={handleSubmit}>
                {isLogin && <LoginForm values={values} errors={errors} touched = {touched} handleBlur = {handleBlur} handleChange = {handleChange}/> }
                {isRegister && <SignUpForm  values={values} errors={errors} touched = {touched} handleBlur = {handleBlur} handleChange = {handleChange}/> }
                {isForgot_pass && <ForgotPasswordForm  values={values} errors={errors} touched = {touched} handleBlur = {handleBlur} handleChange = {handleChange}/>} 
                {isReset_pass && <ResetPasswordForm  values={values} errors={errors} touched = {touched} handleBlur = {handleBlur} handleChange = {handleChange}/>} 
            </form>
            )}
        </Formik>
    )
}

export default From 
