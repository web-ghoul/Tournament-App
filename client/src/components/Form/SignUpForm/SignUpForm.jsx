import React from 'react'
import { useNavigate } from 'react-router-dom'

//MUI
import { Box, Button, TextField, Typography } from '@mui/material'
import { MyButton } from '../../../MUIComponents/MyButton/MyButton'

const SignUpForm = ({values , touched, errors , handleBlur, handleChange}) => {
    const navigate = useNavigate() 
    return (
        <>
            <Typography variant='h3' className={`text-center game-font flex-center`}>Let's get started</Typography>
            <TextField className={`grid-stretch username`} label="Lichess Username" value={values.username_reg} error={Boolean(touched.username_reg) && Boolean(errors.username_reg)} name='username_reg' type="username" onChange={handleChange} id="username_reg" helperText={touched.username_reg && errors.username_reg} onBlur={handleBlur}/>

            <TextField className={`grid-stretch email`} label="Email" name='email' value={values.email} onChange={handleChange} id="email" error={Boolean(touched.email) && Boolean(errors.email)} helperText={touched.email && errors.email} onBlur={handleBlur}/>

            <TextField className={`grid-stretch pass`} label="Password" error={Boolean(touched.password_reg) && Boolean(errors.password_reg)} name='password_reg' type="password" value={values.password_reg} onChange={handleChange} id="password_reg" helperText={touched.password_reg && errors.password_reg} onBlur={handleBlur}/>

            <Box className={`flex-center btn`}>
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
