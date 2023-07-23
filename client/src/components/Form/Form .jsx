import React, { useState } from 'react'
import {Formik} from "formik"
import * as Yup from "yup"
import LoginForm from '../LoginForm/LoginForm'
import SignUpForm from '../SignUpForm/SignUpForm'
import ForgotPasswordForm from '../ForgotPasswordForm/ForgotPasswordForm'
import ResetPasswordForm from '../ResetPasswordForm/ResetPasswordForm'
import axios from "axios"
import swal from "sweetalert2";
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {setUserData} from "../../store/authSlice"
import Cookies from 'js-cookie';
import { Box } from '@mui/material'
import { MyButton } from '../MyButton/MyButton'
import "./Form.css"


const registerSchema = Yup.object().shape({
    email:Yup.string().email().required(),
    username_reg:Yup.string().required("Username is Required"),
    password_reg:Yup.string().required("Password is Required"),
})

const loginSchema = Yup.object().shape({
    username_log:Yup.string().required("Username is Required"),
    password_log:Yup.string().required("Password is Required"),
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

    const handleResetPasswordData = async()=>{
        await axios.get(process.env.REACT_APP_SERVER_URL+`/user/resetPassword/${id}/${unique}`)
        .then((res)=>{
            Cookies.set("user_id",JSON.stringify(res.data.user_id))
        }).catch((err)=>{
            swal.fire({
                title: "Error",
                text: "Error",
                icon: "error",
            })
        })
    }

    if(isReset_pass){
        handleResetPasswordData()
    }

    const handleRegister = async(values , onSubmitProps)=>{
        await axios.post(process.env.REACT_APP_SERVER_URL+"/register",{
            ...values
        }).then((res)=>{
            swal.fire({
                title: "Congratulation!",
                text: res.data.message,
                icon: "success",
            })
            navigate("/login")
            onSubmitProps.resetForm()
        }).catch((err)=>{
            swal.fire({
                title: "Error",
                text: err.response.data.message,
                icon: "error",
            })
        })
    }

    const handleLogin = async(values , onSubmitProps)=>{
        await axios.post(process.env.REACT_APP_SERVER_URL+"/login",{
            ...values
        }).then((res)=>{
            swal.fire({
                title: `Welcome ${values.username_log}`,
                text: res.data.message,
                icon: "success",
            })
            const userData = {username:values.username_log , token:res.data.token}
            Cookies.set('user_data',JSON.stringify(userData) , { expires: 7 });
            Cookies.set('token',res.data.token , { expires: 7 });
            dispatch(setUserData(userData))
            navigate("/")
            Cookies.remove("user_id")
            onSubmitProps.resetForm()
        }).catch((err)=>{
            swal.fire({
                title: "Error",
                text: err.response.data.message,
                icon: "error",
            })
        })
    }

    const handleForgotPassword = async(values , onSubmitProps)=>{
        await axios.post(process.env.REACT_APP_SERVER_URL+"/ForgotPassword",{
            ...values
        }).then((res)=>{
            setSent(true)
            onSubmitProps.resetForm()
            swal.fire({
                title: "Success",
                text: "Check your Mail",
                icon: "success",
            })
        }).catch((err)=>{
            swal.fire({
                title: "Error",
                text: err.response.data.message,
                icon: "error",
            })
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
            swal.fire({
                title: "Success",
                text: res.data.message,
                icon: "success",
            })
        }).catch((err)=>{
            swal.fire({
                title: "Error",
                text: err.response.data.message,
                icon: "error",
            })
        })
    }

    const handleVerify = async()=>{
        await axios.get(process.env.REACT_APP_SERVER_URL+`/user/verify/${id}/${unique}`).then((res)=>{
            navigate(process.env.REACT_APP_LOGIN_PAGE)
            swal.fire({
                title: "Success",
                text: "Verify Successfully",
                icon: "success",
            })
        }).catch((err)=>{
            swal.fire({
                title: "Error",
                text: "Error Exist",
                icon: "error",
            })
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
