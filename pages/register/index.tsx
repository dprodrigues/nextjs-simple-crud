import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Container, Box, Grid, TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'

type FormData = {
  username: string
  email: string
  password: string
}

const Register: NextPage = () => {
  const { register, handleSubmit } = useForm<FormData>()
  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }

    const response = await fetch('/api/register', options)

    if (response.status === 201) {
      router.push('/login')
    }
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
            <TextField label="Username" {...register('username')} />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              {...register('email', { required: true })}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              {...register('password', { required: true, min: 8, max: 32,  })}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Create account
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Register
