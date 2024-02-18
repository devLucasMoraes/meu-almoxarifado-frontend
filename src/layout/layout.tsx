'use client'
import { Box, useTheme } from '@mui/material'
import { AppSideBar } from './AppSideBar'
import { AppTopBar } from './AppTopBar'

export default function Layout({ children }: { children: React.ReactNode }) {
  const theme = useTheme()

  return (
    <Box sx={{ display: 'flex' }}>
      <AppTopBar />

      <AppSideBar />

      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Box
          // necessary for content to be below app bar
          minHeight={theme.mixins.toolbar.minHeight}
        />
        {children}
      </Box>
    </Box>
  )
}
