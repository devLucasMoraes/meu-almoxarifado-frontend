'use client'
import { Menu } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar, Typography, useTheme } from '@mui/material'
import { useDrawerContext } from './context/DrawerContext'

export const AppTopBar = () => {
  const { isDrawerOpen, toggleDrawerOpen, drawerWidth } = useDrawerContext()

  const theme = useTheme()

  return (
    <AppBar
      enableColorOnDark
      position='fixed'
      sx={{
        height: theme.mixins.toolbar.minHeight,
        justifyContent: 'center',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        ...(isDrawerOpen && {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth})`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
          })
        })
      }}
    >
      <Toolbar>
        <IconButton
          onClick={toggleDrawerOpen}
          edge='start'
          sx={{
            marginRight: 5,
            ...(isDrawerOpen && { display: 'none' })
          }}
        >
          <Menu />
        </IconButton>

        <Typography variant='h6' noWrap component='div'>
          Controle de Estoque
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
