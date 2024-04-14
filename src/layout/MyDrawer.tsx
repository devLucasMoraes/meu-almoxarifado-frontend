import { useDrawerContext } from '@/layout/context/DrawerContext'
import { CSSObject, Drawer, Theme, useMediaQuery, useTheme } from '@mui/material'

interface IMyDrawerProps {
  children: React.ReactNode
}

export const MyDrawer = ({ children }: IMyDrawerProps) => {
  const { isDrawerOpen, drawerWidth, toggleDrawerOpen } = useDrawerContext()

  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden'
  })

  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`
    }
  })

  return (
    <Drawer
      variant={mdDown ? 'temporary' : 'permanent'}
      open={isDrawerOpen}
      onClose={toggleDrawerOpen}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(isDrawerOpen && {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme)
        }),
        ...(!isDrawerOpen && {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme)
        })
      }}
    >
      {children}
    </Drawer>
  )
}
