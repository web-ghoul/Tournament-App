import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {setUserData} from "../../store/slices/authSlice"
import {handleToastMessage} from "../../App"
import {Formik} from "formik"
import Cookies from 'js-cookie';
import axios from "axios"
import * as Yup from "yup"

//Components
import LoginForm from './LoginForm/LoginForm'
import SignUpForm from './SignUpForm/SignUpForm'
import ForgotPasswordForm from './ForgotPasswordForm/ForgotPasswordForm'
import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm'

//MUI
import { Box } from '@mui/material'
import { MyButton } from '../../MUIComponents/MyButton/MyButton'

//Style
import "./Form.css"


const From  = (props) => {
    const isLogin = props.formType === "login"
    const isRegister = props.formType === "register"
    const isForgot_pass = props.formType === "forgot_pass"
    const isReset_pass = props.formType === "reset_pass"
    const isVerify = props.formType === "verify"
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id,unique} = useParams()
    const [sent , setSent] = useState(false)

    const registerSchema = Yup.object().shape({
        email:Yup.string().email().required(),
        username_reg:Yup.string().required("Username is Required"),
        password_reg:Yup.string().required("Password is Required").min(8)
    })
    
    const loginSchema = Yup.object().shape({
        username_log:Yup.string().required("Username is Required"),
        password_log:Yup.string().required("Password is Required")
    })
    
    const forgotPassSchema = Yup.object().shape({
        forgot_pass_username:Yup.string().required("Username is Required"),
    })
    
    const resetPasswordSchema = Yup.object().shape({
        new_password:Yup.string().required().min(8),
        confirm_password:Yup.string().required().min(8).when("new_password", (new_password , field)=> new_password ? field.required("Password isn't Matched").oneOf([Yup.ref("new_password")]) : field),
    })
    
    const initialLoginValues = {
        username_log:"",
        password_log:""
    }
    
    const initialRegisterValues = {
        email:"",
        username_reg:"",
        password_reg:""
    }
    
    const initialForgotPassValues = {
        forgot_pass_username:""
    }
    
    const initialResetPasswordValues = {
        new_password:"",
        confirm_password:"",
    }

    const handleResetPasswordData = async()=>{
        await axios.get(process.env.REACT_APP_SERVER_URL+`/user/resetPassword/${id}/${unique}`)
        .then((res)=>{
            Cookies.set("user_id",JSON.stringify(res.data.user_id))
        }).catch((err)=>{
            try{
                handleToastMessage(err.response.data.message,"e")
            }
            catch(error){
                handleToastMessage("Error","e")
            }
        })
    }

    if(isReset_pass){
        handleResetPasswordData()
    }

    const handleRegister = async(values , onSubmitProps)=>{
        await axios.post(process.env.REACT_APP_SERVER_URL+"/register",{
            ...values
        }).then((res)=>{
            try{
                handleToastMessage(res.data.message,"s")
            }catch(error){
                handleToastMessage("Email is Created Successfully","s")
            }
            navigate("/login")
            onSubmitProps.resetForm()
        }).catch((err)=>{
            try{
                handleToastMessage(err.response.data.message,"e")
            }catch(error){
                handleToastMessage( "Error","e")
            }
        })
    }

    const handleLogin = async(values , onSubmitProps)=>{
        await axios.post(process.env.REACT_APP_SERVER_URL+"/login",{
            ...values
        }).then((res)=>{
            const userData = {username:values.username_log , token:res.data.token , role:res.data.role, tutorial:res.data.tutorial}
            Cookies.set('user_data',JSON.stringify(userData) , { expires: 7 });
            Cookies.set('token',res.data.token , { expires: 7 });
            dispatch(setUserData(userData))
            navigate("/")
            try{
                Cookies.remove("user_id")
            }catch(error){
                console.log(error)
            }
            onSubmitProps.resetForm()
            handleToastMessage(`Welcome ${values.username_log}`,"s")
        }).catch((err)=>{
            try{
                handleToastMessage(err.response.data.message,"e")
            }catch(error){
                handleToastMessage("Error","e")
            }
        })
    }

    const handleForgotPassword = async(values , onSubmitProps)=>{
        await axios.post(process.env.REACT_APP_SERVER_URL+"/ForgotPassword",{
            ...values
        }).then((res)=>{
            setSent(true)
            onSubmitProps.resetForm()
            try{
                handleToastMessage(res.data.message,"s")
            }catch(error){
                handleToastMessage( "Check your Mail","s")
            }
        }).catch((err)=>{
            try{
                handleToastMessage( err.response.data.message,"e")
            }catch(error){
                handleToastMessage( "Error","e")
            }
        })
    }

    const handleResetPassword = async(values , onSubmitProps)=>{
        let user_id = Cookies.get('user_id')
        user_id = JSON.parse(user_id)
        values={...values,user_id}
        await axios.post(process.env.REACT_APP_SERVER_URL+`/ResetPassword`,{
            ...values
        }).then((res)=>{
            Cookies.remove('Forgot_Password_Username');
            navigate(process.env.REACT_APP_LOGIN_PAGE)
            onSubmitProps.resetForm()
            handleToastMessage(res.data.message,"s")
        }).catch((err)=>{
            handleToastMessage(err.response.data.message,"e")
        })
    }

    const handleVerify = async()=>{
        await axios.get(process.env.REACT_APP_SERVER_URL+`/user/verify/${id}/${unique}`).then((res)=>{
            navigate(process.env.REACT_APP_LOGIN_PAGE)
            try{
                handleToastMessage(res.data.message,"s")
            }catch(error){
                handleToastMessage("Email Verified Successfully","s")
            }
        }).catch((err)=>{
            try{
                handleToastMessage(err.response.data.message,"e")
            }catch(error){
                handleToastMessage("Error","e")
            }
        })
    }

    if(isVerify){
        return(
            <Box className={`verify flex-center`}>
                <MyButton onClick={()=>handleVerify()}>Activate Account</MyButton>
            </Box>
        )
    }

    return (
        <Formik
            initialValues={isLogin ? initialLoginValues : isRegister ? initialRegisterValues : isReset_pass ? initialResetPasswordValues : isForgot_pass && initialForgotPassValues}
            validationSchema={isLogin ? loginSchema : isRegister ? registerSchema : isReset_pass ? resetPasswordSchema : isForgot_pass && forgotPassSchema}
            className={`flex-center`}
            onSubmit={isRegister ? handleRegister : isLogin ?  handleLogin : isForgot_pass ? handleForgotPassword : handleResetPassword}
        >
            {({values,errors, touched , handleSubmit , handleBlur,handleChange})=>(
            <form className={`grid-stretch form`} onSubmit={handleSubmit}>
                {isLogin && <LoginForm values={values} errors={errors} touched = {touched} handleBlur = {handleBlur} handleChange = {handleChange}/> }
                {isRegister && <SignUpForm  values={values} errors={errors} touched = {touched} handleBlur = {handleBlur} handleChange = {handleChange}/> }
                {isForgot_pass && <ForgotPasswordForm sent={sent} values={values} errors={errors} touched = {touched} handleBlur = {handleBlur} handleChange = {handleChange}/>} 
                {isReset_pass && <ResetPasswordForm  values={values} errors={errors} touched = {touched} handleBlur = {handleBlur} handleChange = {handleChange}/>} 
            </form>
            )}
        </Formik>
    )
}

export default From 
