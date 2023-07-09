import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MyButton } from '../MyButton/MyButton'

const LoginForm = ({values , touched, errors , handleBlur, handleChange}) => {
    const navigate = useNavigate() 
    return (
        <>
            <Typography variant='h3' className={`text-center game-font flex-center`}>Welcome To Tournament</Typography>
            <TextField className={`grid-stretch email`} label="Username" name='username' value={values.username} onChange={handleChange} id="username" error={Boolean(touched.username) && Boolean(errors.username)} helperText={touched.username && errors.username} onBlur={handleBlur}/>
            <TextField className={`grid-stretch pass`} label="Password" error={Boolean(touched.password) && Boolean(errors.password)} name='password' type="password" value={values.password} onChange={handleChange} id="password" helperText={touched.password && errors.password} onBlur={handleBlur}/>
            <Box className={`flex-start forgot`}>
                <Typography variant='h5'>Forgot your password?</Typography>
                {/*onClick Wait Till End*/}
                <Button onClick={()=>navigate(process.env.REACT_APP_FORGOT_PASS_PAGE)}>Recover Password</Button>
            </Box>
            <Box className={`flex-center btn`}>
                {/*onClick Wait Till End*/}
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
