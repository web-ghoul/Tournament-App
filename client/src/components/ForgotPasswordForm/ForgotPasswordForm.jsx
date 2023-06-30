import { Box, TextField, Typography } from '@mui/material'
import React from 'react'
import { MyButton } from '../MyButton/MyButton'

const ForgotPasswordForm = ({values , touched, errors , handleBlur, handleChange}) => {
        return (
        <>
            <Typography variant='h3' className={`text-center game-font flex-center`}>Forgot Your Password ?</Typography>
            <TextField className={`grid-stretch email`} label="Email" name='email' value={values.email} onChange={handleChange} id="email" error={Boolean(touched.email) && Boolean(errors.email)} helperText={touched.email && errors.email} onBlur={handleBlur}/>
            <Box className={`flex-center btn`}>
                {/*onClick Wait Till End*/}
                <MyButton type="submit">Reset Password</MyButton>
            </Box>
        </>
    )
}

export default ForgotPasswordForm
