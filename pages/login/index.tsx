import type { NextPage } from 'next'
import { Container, Box, Grid, TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
  password: string
}

const Login: NextPage = () => {
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    console.log("data:", data)
  }

  return (
    <Container>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Email" {...register('email')} />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Password" {...register('password')} />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Login
