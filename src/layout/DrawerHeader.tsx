import { Box, useTheme } from '@mui/material'

interface IDrawerHeaderProps {
  children: React.ReactNode
}

export const DrawerHeader = ({ children }: IDrawerHeaderProps) => {
  const theme = useTheme()

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='flex-end'
      padding={theme.spacing(0, 1)}
      // necessary for content to be below app bar
      minHeight={theme.mixins.toolbar.minHeight}
    >
      {children}
    </Box>
  )
}
