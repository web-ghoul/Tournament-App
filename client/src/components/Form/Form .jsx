import React, { useState } from 'react'
import "./Form.css"
import {Formik} from "formik"
import * as Yup from "yup"
import LoginForm from '../LoginForm/LoginForm'
import SignUpForm from '../SignUpForm/SignUpForm'
import ForgotPasswordForm from '../ForgotPasswordForm/ForgotPasswordForm'
import ResetPasswordForm from '../ResetPasswordForm/ResetPasswordForm'
import axios from "axios"
import swal from 'sweetalert';
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {setUserData} from "../../store/authSlice"
import Cookies from 'js-cookie';


const registerSchema = Yup.object().shape({
    email:Yup.string().email().required(),
    username:Yup.string().required(),
    password:Yup.string().required(),
})

const loginSchema = Yup.object().shape({
    username:Yup.string().required(),
    password:Yup.string().required(),
})

const forgotPassSchema = Yup.object().shape({
    forgot_pass_username:Yup.string().required("Username is Required"),
})

const resetPasswordSchema = Yup.object().shape({
    old_password:Yup.string().required().min(8),
    new_password:Yup.string().required().min(8).when("old_password", (old_password , field)=>old_password ? field.required() : field),
    confirm_password:Yup.string().required().min(8).when("new_password", (new_password , field)=> new_password ? field.required().oneOf([Yup.ref("new_password")]) : field),
})

const initialLoginValues = {
    username:"",
    password:""
}

const initialRegisterValues = {
    email:"",
    username:"",
    password:""
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
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id,unique} = useParams()
    const [sent , setSent] = useState(false)

    if(isReset_pass){
        axios.get(`http://localhost:3000/user/resetPassword/${id}/${unique}`)
        .then((res)=>{
            Cookies.set("user_id",JSON.stringify(res.data.user_id))
        }).catch((err)=>{
            swal({
                title: "Error",
                text: "Error ",
                icon: "error",
                dangerMode: true,
            })
        })
    }

    const handleRegister = async(values , onSubmitProps)=>{
        console.log(1)
        await axios.post("http://localhost:3000/register",{
            ...values
        }).then((res)=>{
            console.log(1)
            swal({
                title: "Congratulation!",
                text: res.data.message,
                icon: "success",
                dangerMode: false,
            })
            navigate("/login")
            onSubmitProps.resetForm()
        }).catch((err)=>{
            console.log(1)
            swal({
                title: "Error",
                text: err.response.data.message,
                icon: "error",
                dangerMode: true,
            })
        })
    }

    const handleLogin = async(values , onSubmitProps)=>{
        await axios.post("http://localhost:3000/login",{
            ...values
        }).then((res)=>{
            swal({
                title: `Welcome ${values.username}`,
                text: res.data.message,
                icon: "success",
                dangerMode: false,
            })
            const userData = {username:values.username , token:res.data.token}
            Cookies.set('user_data',JSON.stringify(userData) , { expires: 7 });
            dispatch(setUserData(userData))
            navigate("/")
            onSubmitProps.resetForm()
        }).catch((err)=>{
            swal({
                title: "Error",
                text: err.response.data.message,
                icon: "error",
                dangerMode: true,
            })
        })
    }

    const handleForgotPassword = async(values , onSubmitProps)=>{
        await axios.post("http://localhost:3000/ForgotPassword",{
            ...values
        }).then((res)=>{
            Cookies.set('Forgot_Password_Username',values.forgot_pass_username , { expires: 1 });
            setSent(true)
            onSubmitProps.resetForm()
        }).catch((err)=>{
            swal({
                title: "Error",
                text: err.response.data.message,
                icon: "error",
                dangerMode: true,
            })
        })
    }

    const handleResetPassword = async(values , onSubmitProps)=>{
        let user_id = Cookies.get('user_id')
        user_id = JSON.parse(user_id)
        values={...values,user_id}
        await axios.post("http://localhost:3000/ResetPassword",{
            ...values
        }).then((res)=>{
            Cookies.remove('Forgot_Password_Username');
            navigate(process.env.REACT_APP_LOGIN_PAGE)
            onSubmitProps.resetForm()
        }).catch((err)=>{
            swal({
                title: "Error",
                text: err.response.data.message,
                icon: "error",
                dangerMode: true,
            })
        })
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
