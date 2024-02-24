'use client'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { MyDataGrid } from '@/app/ui/shared/components/MyDataGrid'
import { CrudTools } from '@/app/ui/shared/components/crudTools/CrudTools'
import { Environment } from '@/environment'
import { localDeAplicacaoQueries } from '@/queries/LocalDeAplicacaoQueries'
import { TLocalDeAplicacao } from '@/types/models'
import { Delete, Edit, Preview } from '@mui/icons-material'
import { IconButton, Stack } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  console.log('renderizou LocaisDeAplicacaoList')

  const { LOCAIS_DE_APLICACAO, LIMITE_DE_LINHAS } = Environment

  const router = useRouter()

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: LIMITE_DE_LINHAS
  })

  const { data, isLoading } = useQuery({
    ...localDeAplicacaoQueries.getAll(paginationModel.page, paginationModel.pageSize),
    placeholderData: keepPreviousData
  })

  const { mutate: deleteById } = localDeAplicacaoQueries.deleteById()

  function onInfo(params: GridRenderCellParams): void {
    // se existe o id, navega para a página de exibição
    if (!params.row.id) return
    router.push(`${LOCAIS_DE_APLICACAO.SHOW_PAGE.replace('id', String(params.row.id))}`)
  }

  function onEdit(params: GridRenderCellParams): void {
    // se existe o id, navega para a página de edição
    if (!params.row.id) return
    router.push(`${LOCAIS_DE_APLICACAO.EDIT_PAGE.replace('id', String(params.row.id))}`)
  }

  function onDelete(params: GridRenderCellParams): void {
    // se existe o id, remove o usuário
    if (!params.row.id) return
    if (confirm('Realmente deseja apagar?')) {
      deleteById(params.row.id)
    }
  }

  const columns: GridColDef<TLocalDeAplicacao>[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nome', headerName: 'Nome', minWidth: 155, flex: 0.3 },
    {
      field: 'actions',
      headerName: 'Ações',
      minWidth: 150,
      flex: 0.1,
      sortable: false,
      disableColumnMenu: true,
      renderCell: params => (
        <Stack direction='row' spacing={2}>
          <IconButton color='info' size='small' onClick={() => onInfo(params)}>
            <Preview fontSize='inherit' />
          </IconButton>

          <IconButton color='info' size='small' onClick={() => onEdit(params)}>
            <Edit fontSize='inherit' />
          </IconButton>

          <IconButton color='error' size='small' onClick={() => onDelete(params)}>
            <Delete fontSize='inherit' />
          </IconButton>
        </Stack>
      )
    }
  ]

  return (
    <BasePageLayout
      pageTitle='Locais de Aplicação'
      breadcrumbsPath={[{ label: 'Locais', to: `${LOCAIS_DE_APLICACAO.LIST_PAGE}` }, { label: 'Listar' }]}
      tools={
        <CrudTools mostrarBotaoNovo tituloBotaoNovo='Novo Local' linkBotaoNovo={LOCAIS_DE_APLICACAO.CREATE_PAGE} />
      }
    >
      <MyDataGrid
        isLoading={isLoading}
        columns={columns}
        rows={data?.content}
        totalRowCount={data?.totalElements}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />
    </BasePageLayout>
  )
}
