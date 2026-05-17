import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#2196f3' },
    secondary: { main: '#e040fb' }
  },
  shape: { borderRadius: 12 },
  typography: { fontFamily: 'Inter, Roboto, Arial, sans-serif' }
})

export default theme
