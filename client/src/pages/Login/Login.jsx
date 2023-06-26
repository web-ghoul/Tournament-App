import React from 'react'
import Box from '@mui/material/Box'
import { Button, Container, Typography } from '@mui/material'
import Logo from "../../components/Logo/Logo"

const Login = () => {
  return (
    <Box>
      <Container>
        <Box>
          <Button>
            <Typography variant='h5'>Back to Tournaments</Typography>
          </Button>
          <Logo/>
        </Box>
      </Container>
    </Box>
  )
}

export default Login
