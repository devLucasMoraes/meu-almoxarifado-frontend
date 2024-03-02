import { Box, useTheme } from '@mui/material'

export function CrudToolsRoot({ children }: { children: React.ReactNode }) {
  const theme = useTheme()

  //const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Box display='flex' gap={2} height={theme.spacing(5)} justifyContent='end' alignItems='center'>
      {children}
    </Box>
  )
}
