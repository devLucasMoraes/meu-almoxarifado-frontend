import { Clear, Delete, Download, Edit, PreviewOutlined } from '@mui/icons-material'
import { Box, Button, Input, Typography, useMediaQuery, useTheme } from '@mui/material'
import NextLink from 'next/link'

export const CrudTools = ({
  mostrarBotaoNovo = false,
  mostrarBotaoSalvar = false,
  mostrarBotaoCancelar = false,
  mostrarBotaoImportarXML = false,
  mostrarBotaoResetXML = false,
  mostrarBotaoExibir = false,
  mostrarBotaoEditar = false,
  mostrarBotaoApagar = false,
  aoClicarEmCancelar,
  aoClicarEmApagar,
  aoClicarEmSalvar,
  aoClicarEmResetXML,
  aoAlternarArquivo,
  linkBotaoCancelar,
  linkBotaoExibir = '/dashboard',
  linkBotaoEditar = '/dashboard',
  linkBotaoNovo = '/dashboard',
  tituloBotaoNovo = 'Novo(a)'
}: {
  mostrarBotaoNovo?: boolean
  mostrarBotaoSalvar?: boolean
  mostrarBotaoCancelar?: boolean
  mostrarBotaoImportarXML?: boolean
  mostrarBotaoResetXML?: boolean
  mostrarBotaoExibir?: boolean
  mostrarBotaoEditar?: boolean
  mostrarBotaoApagar?: boolean
  aoClicarEmCancelar?: () => void
  aoClicarEmApagar?: () => void
  aoClicarEmSalvar?: () => void
  aoClicarEmResetXML?: () => void
  aoAlternarArquivo?: (e: React.ChangeEvent<HTMLInputElement>) => void
  linkBotaoCancelar?: string
  linkBotaoExibir?: string
  linkBotaoEditar?: string
  linkBotaoNovo?: string
  tituloBotaoNovo?: string
}) => {
  const theme = useTheme()

  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box display='flex' gap={2} height={theme.spacing(5)} justifyContent='end' alignItems='center'>
      {mostrarBotaoSalvar && (
        <Button type='submit' variant='contained' size='large' onClick={aoClicarEmSalvar}>
          Salvar
        </Button>
      )}

      {mostrarBotaoNovo && (
        <Button component={NextLink} href={linkBotaoNovo} variant='contained'>
          {tituloBotaoNovo}
        </Button>
      )}

      {mostrarBotaoCancelar && (
        <Button component={NextLink} href={linkBotaoCancelar ?? ''} size='large' onClick={aoClicarEmCancelar}>
          Cancelar
        </Button>
      )}

      {mostrarBotaoResetXML && (
        <Button color='error' variant='contained' startIcon={<Clear />} onClick={aoClicarEmResetXML}>
          Reset
        </Button>
      )}

      {mostrarBotaoImportarXML && (
        <Button color='primary' variant='outlined' component='label' startIcon={!smDown ? <Download /> : ''}>
          {smDown && <Download />}
          {!smDown && (
            <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
              IMPORTAR XML
            </Typography>
          )}
          <Input inputProps={{ accept: '.xml' }} type='file' sx={{ display: 'none' }} onChange={aoAlternarArquivo} />
        </Button>
      )}

      {mostrarBotaoExibir && (
        <Button component={NextLink} href={linkBotaoExibir} startIcon={<PreviewOutlined />} variant='outlined'>
          Exibir
        </Button>
      )}

      {mostrarBotaoEditar && (
        <Button component={NextLink} href={linkBotaoEditar} variant='outlined' startIcon={<Edit />}>
          Editar
        </Button>
      )}

      {mostrarBotaoApagar && (
        <Button color='error' variant='contained' startIcon={<Delete />} onClick={aoClicarEmApagar}>
          Apagar
        </Button>
      )}
    </Box>
  )
}
