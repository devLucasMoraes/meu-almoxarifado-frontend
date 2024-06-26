'use client'
import { Environment } from '@/environment'
import { IDrawerOptions } from '@/types/layout'
import {
  Build,
  Category,
  ChevronLeft,
  ChevronRight,
  Description,
  ExpandMore,
  Factory,
  ImportExport,
  InsertChart,
  Inventory,
  LineAxis,
  LocalShipping,
  Man,
  Person,
  Place
} from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  IconButton,
  List,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { useState } from 'react'
import { DrawerHeader } from './DrawerHeader'
import { ListItemLink } from './ListItemLink'
import { MyDrawer } from './MyDrawer'
import { useDrawerContext } from './context/DrawerContext'

export const AppSideBar = () => {
  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext()
  //const { toggleTheme, themeName } = useAppThemeContext();

  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleAccordionStyle = (painel: string) => {
    const accordion = {
      '&:hover': {
        backgroundColor: expanded === painel ? theme.palette.background.paper : theme.palette.background.default // Cor ao passar o mouse
      }
    }

    return accordion
  }

  const drawerOptions: IDrawerOptions[] = [
    {
      label: 'Dashboard',
      icon: <LineAxis />,
      path: '/dashboard',
      group: ''
    },
    {
      label: 'Usuarios',
      icon: <Person />,
      path: '/dashboard/users',
      group: 'Cadastro'
    },
    {
      label: 'Categorias',
      icon: <Category />,
      path: Environment.CATEGORIAS.LIST_PAGE,
      group: 'Cadastro'
    },
    {
      label: 'Materiais',
      icon: <Inventory />,
      path: Environment.MATERIAIS.LIST_PAGE,
      group: 'Cadastro'
    },
    {
      label: 'Fornecedoras',
      icon: <Factory />,
      path: Environment.FORNECEDORAS.LIST_PAGE,
      group: 'Cadastro'
    },
    {
      label: 'Transportadoras',
      icon: <LocalShipping />,
      path: Environment.TRANSPORTADORAS.LIST_PAGE,
      group: 'Cadastro'
    },
    {
      label: 'Requisitantes',
      icon: <Man />,
      path: Environment.REQUISITANTES.LIST_PAGE,
      group: 'Cadastro'
    },
    {
      label: 'Locais de Aplicaçao',
      icon: <Place />,
      path: Environment.LOCAIS_DE_APLICACAO.LIST_PAGE,
      group: 'Cadastro'
    },
    {
      label: 'NF-e de Compra',
      icon: <Description />,
      path: Environment.NFE_DE_COMPRA.LIST_PAGE,
      group: 'Compras'
    },
    {
      label: 'Requisiçoes',
      icon: <ImportExport />,
      path: Environment.REQUISICOES_DE_ESTOQUE.LIST_PAGE,
      group: 'Estoque'
    },
    {
      label: 'Acerto de Estoque',
      icon: <Build />,
      path: Environment.MATERIAIS.ACERTO_ESTOQUE,
      group: 'Estoque'
    },
    {
      label: 'Saldo',
      icon: <InsertChart />,
      path: Environment.MATERIAIS.ESTOQUE,
      group: 'Estoque'
    }
  ]

  return (
    <MyDrawer>
      <DrawerHeader>
        <IconButton onClick={toggleDrawerOpen}>
          {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </DrawerHeader>

      <Divider />

      <Box flex={1}>
        <List component='nav'>
          {drawerOptions.map(
            drawerOption =>
              !drawerOption.group && (
                <ListItemLink
                  key={drawerOption.path}
                  label={drawerOption.label}
                  icon={drawerOption.icon}
                  to={drawerOption.path}
                  onClick={mdDown ? toggleDrawerOpen : undefined}
                />
              )
          )}

          {isDrawerOpen && (
            <Accordion
              disableGutters
              expanded={expanded === 'Cadastro'}
              onChange={handleChange('Cadastro')}
              sx={() => handleAccordionStyle('Cadastro')}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant='h6'>Cadastro</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {drawerOptions
                  .filter(option => option.group === 'Cadastro')
                  .map(drawerOption => (
                    <ListItemLink
                      key={drawerOption.path}
                      label={drawerOption.label}
                      icon={drawerOption.icon}
                      to={drawerOption.path}
                      onClick={mdDown ? toggleDrawerOpen : undefined}
                    />
                  ))}
              </AccordionDetails>
            </Accordion>
          )}

          {isDrawerOpen && (
            <Accordion
              disableGutters
              expanded={expanded === 'Compras'}
              onChange={handleChange('Compras')}
              sx={() => handleAccordionStyle('Compras')}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant='h6'>Compras</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {drawerOptions
                  .filter(option => option.group === 'Compras')
                  .map(drawerOption => (
                    <ListItemLink
                      key={drawerOption.path}
                      label={drawerOption.label}
                      icon={drawerOption.icon}
                      to={drawerOption.path}
                      onClick={mdDown ? toggleDrawerOpen : undefined}
                    />
                  ))}
              </AccordionDetails>
            </Accordion>
          )}

          {isDrawerOpen && (
            <Accordion
              disableGutters
              expanded={expanded === 'Estoque'}
              onChange={handleChange('Estoque')}
              sx={() => handleAccordionStyle('Estoque')}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant='h6'>Estoque</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {drawerOptions
                  .filter(option => option.group === 'Estoque')
                  .map(drawerOption => (
                    <ListItemLink
                      key={drawerOption.path}
                      label={drawerOption.label}
                      icon={drawerOption.icon}
                      to={drawerOption.path}
                      onClick={mdDown ? toggleDrawerOpen : undefined}
                    />
                  ))}
              </AccordionDetails>
            </Accordion>
          )}
        </List>
      </Box>

      <Divider />

      {/*       <List component='nav'>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onClick={toggleTheme}
            sx={{
              minHeight: 48,
              justifyContent: isDrawerOpen ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isDrawerOpen ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </ListItemIcon>

            <ListItemText
              primary={themeName === 'light' ? 'Tema escuro' : 'Tema claro'}
              sx={{ opacity: isDrawerOpen ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      </List> */}
    </MyDrawer>
  )
}
