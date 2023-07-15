import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MyButton } from '../MyButton/MyButton'

const SignUpForm = ({values , touched, errors , handleBlur, handleChange}) => {
    const navigate = useNavigate() 
    return (
        <>
            <Typography variant='h3' className={`text-center game-font flex-center`}>Let's get started</Typography>
            <TextField className={`grid-stretch username`} label="Username" value={values.username} error={Boolean(touched.username) && Boolean(errors.username)} name='username' type="username" onChange={handleChange} id="username" helperText={touched.username && errors.username} onBlur={handleBlur}/>
            <TextField className={`grid-stretch email`} label="Email" name='email' value={values.email} onChange={handleChange} id="email" error={Boolean(touched.email) && Boolean(errors.email)} helperText={touched.email && errors.email} onBlur={handleBlur}/>
            <TextField className={`grid-stretch pass`} label="Password" error={Boolean(touched.password) && Boolean(errors.password)} name='password' type="password" value={values.password} onChange={handleChange} id="password" helperText={touched.password && errors.password} onBlur={handleBlur}/>
            <Box className={`flex-center btn`}>
                {/*onClick Wait Till End*/}
                <MyButton type="submit">Sign Up</MyButton>
            </Box>
            <Box className={`flex-center have_acc`}>
                <Typography variant='h5'>Already have an account?</Typography>
                <Button onClick={()=>navigate(process.env.REACT_APP_LOGIN_PAGE)}>Sign In</Button>
            </Box>
        </>
    )
}

export default SignUpForm
