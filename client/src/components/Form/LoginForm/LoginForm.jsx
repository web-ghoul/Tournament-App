import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import cookies from 'js-cookie'

//MUI
import { Box, Button, TextField, Typography } from '@mui/material'
import { MyButton } from '../../../MUIComponents/MyButton/MyButton'

const LoginForm = ({values , touched, errors , handleBlur, handleChange}) => {
    const navigate = useNavigate() 
    useEffect(()=>{
        try{
            cookies.remove("user_data")
            cookies.remove("token")
        }catch(err){
            console.log(err)
        }
    },[])
    return (
        <>
            <Typography variant='h3' className={`text-center game-font flex-center`}>Welcome To Tournament</Typography>
            <TextField className={`grid-stretch email`} label="Username" name='username_log' value={values.username_log} onChange={handleChange} id="username_log" error={Boolean(touched.username_log) && Boolean(errors.username_log)} helperText={touched.username_log && errors.username_log} onBlur={handleBlur}/>
            
            <TextField className={`grid-stretch pass`} label="Password" error={Boolean(touched.password_log) && Boolean(errors.password_log)} name='password_log' type="password" value={values.password_log} onChange={handleChange} id="password_log" helperText={touched.password_log && errors.password_log} onBlur={handleBlur}/>

            <Box className={`flex-start forgot`}>
                <Typography variant='h5'>Forgot your password?</Typography>
                <Button onClick={()=>navigate(process.env.REACT_APP_FORGOT_PASS_PAGE)}>Recover Password</Button>
            </Box>

            <Box className={`flex-center btn`}>
                <MyButton type="submit">Sign In</MyButton>
            </Box>

            <Box className={`flex-center have_acc`}>
                <Typography variant='h5'>Don't have an account?</Typography>
                <Button onClick={()=>navigate(process.env.REACT_APP_SIGNUP_PAGE)}>Sign Up Here</Button>
            </Box>
        </>
    )
}

export default LoginForm
