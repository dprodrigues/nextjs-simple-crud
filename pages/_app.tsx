import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import theme from '../theme'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
