import { useDrawerContext } from '@/layout/context/DrawerContext'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import NextLink from 'next/link'

interface IListItemLinkProps {
  label: string
  icon: JSX.Element
  to: string
  onClick: (() => void) | undefined
}

export const ListItemLink = ({ icon, label, to, onClick }: IListItemLinkProps) => {
  const { isDrawerOpen } = useDrawerContext()

  //const resolvedPath = useResolvedPath(to);

  //const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    onClick?.()
  }

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        component={NextLink}
        href={to}
        //selected={!!match}
        onClick={handleClick}
        sx={{
          minHeight: 48,
          justifyContent: isDrawerOpen ? 'initial' : 'center',
          px: 2.5
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isDrawerOpen ? 3 : 'auto',
            justifyContent: 'center'
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={label} sx={{ opacity: isDrawerOpen ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  )
}
