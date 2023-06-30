import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MyButton } from '../MyButton/MyButton'

const ResetPasswordForm = ({values , touched, errors , handleBlur, handleChange}) => {
    const navigate = useNavigate() 
    return (
        <>
            <Typography variant='h3' className={`text-center game-font flex-center`}>Reset Your Password</Typography>
            <TextField className={`grid-stretch pass`} label="Old Password" error={Boolean(touched.old_password) && Boolean(errors.old_password)} name='old_password' type="password" value={values.old_password} onChange={handleChange} id="password" helperText={touched.old_password && errors.old_password} onBlur={handleBlur}/>
            <TextField className={`grid-stretch pass`} label="New Password" error={Boolean(touched.new_password) && Boolean(errors.new_password)} name='new_password' type="password" value={values.new_password} onChange={handleChange} id="password" helperText={touched.new_password && errors.new_password} onBlur={handleBlur}/>
            <TextField className={`grid-stretch pass`} label="Confirm Password" error={Boolean(touched.confirm_password) && Boolean(errors.confirm_password)} name='confirm_password' type="password" value={values.confirm_password} onChange={handleChange} id="password" helperText={touched.confirm_password && errors.confirm_password} onBlur={handleBlur}/>
            <Box className={`flex-center btn`}>
                {/*onClick Wait Till End*/}
                <MyButton type="submit">Reset Password</MyButton>
            </Box>
        </>
    )
}

export default ResetPasswordForm
