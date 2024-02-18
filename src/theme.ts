'use client'
import { ptBR as MaterialLocale } from '@mui/material/locale'
import { createTheme } from '@mui/material/styles'
import { ptBR as DataGridLocale } from '@mui/x-data-grid'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
})

const theme = createTheme(
  {
    palette: {
      mode: 'light'
    },
    typography: {
      fontFamily: roboto.style.fontFamily
    },
    components: {
      MuiAlert: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.severity === 'info' && {
              backgroundColor: '#60a5fa'
            })
          })
        }
      }
    }
  },
  DataGridLocale,
  MaterialLocale
)

export default theme
