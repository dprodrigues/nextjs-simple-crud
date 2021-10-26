import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { post } from '../../lib/api'
import { EMAIL_REGEX } from '../../lib/constants'

type FormData = {
  username: string
  email: string
  password: string
}

const Register: NextPage = () => {
  const { register, handleSubmit } = useForm<FormData>()
  const router = useRouter()

  const onSubmit = async (formData: FormData) => {
    const submited = await post('/user', formData)

    if (submited) {
      router.push('/login')
    }
  }

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      <Container>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            height: '100vh',
            textAlign: 'center',
          }}
        >
          <Grid component="form" container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                {...register('username', { required: true })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                autoComplete="email"
                {...register('email', {
                  required: true,
                  pattern: EMAIL_REGEX,
                })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                autoComplete="current-password"
                {...register('password', { required: true, min: 8, max: 32 })}
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
    </>
  )
}

export default Register
