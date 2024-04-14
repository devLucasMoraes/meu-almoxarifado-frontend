'use client'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { CrudTools } from '@/app/ui/shared/components/CrudTools'
import { MyDataGrid } from '@/app/ui/shared/components/MyDataGrid'
import { Environment } from '@/environment'
import { transportadoraQueries } from '@/queries/TransportadoraQueries'
import { TTransportadora } from '@/types/models'
import { Delete, Edit, Preview } from '@mui/icons-material'
import { IconButton, Stack } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  console.log('renderizou TransportadoraList')

  const { LIMITE_DE_LINHAS, TRANSPORTADORAS } = Environment

  const router = useRouter()

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: LIMITE_DE_LINHAS
  })

  const { data, isLoading } = useQuery({
    ...transportadoraQueries.getAll(paginationModel.page, paginationModel.pageSize),
    placeholderData: keepPreviousData
  })

  const { mutate: deleteById } = transportadoraQueries.deleteById()

  function onInfo(params: GridRenderCellParams): void {
    // se existe o id, navega para a página de exibição
    if (!params.row.id) return
    router.push(`${TRANSPORTADORAS.SHOW_PAGE.replace('id', String(params.row.id))}`)
  }

  function onEdit(params: GridRenderCellParams): void {
    // se existe o id, navega para a página de edição
    if (!params.row.id) return
    router.push(`${TRANSPORTADORAS.EDIT_PAGE.replace('id', String(params.row.id))}`)
  }

  function onDelete(params: GridRenderCellParams): void {
    // se existe o id, remove o usuário
    if (!params.row.id) return
    if (confirm('Realmente deseja apagar?')) {
      deleteById(params.row.id)
    }
  }

  const columns: GridColDef<TTransportadora>[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nomeFantasia', headerName: 'Nome fantasia', minWidth: 155, flex: 0.3 },
    { field: 'razaoSocial', headerName: 'Razão social', minWidth: 155, flex: 0.2 },
    { field: 'cnpj', headerName: 'CNPJ', minWidth: 155, flex: 0.1 },
    { field: 'fone', headerName: 'Telefone', minWidth: 155, flex: 0.1 },
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
      pageTitle='Listar'
      breadcrumbsPath={[{ label: 'Transportadoras', to: `${TRANSPORTADORAS.LIST_PAGE}` }, { label: 'Listar' }]}
      tools={
        <CrudTools.Root>
          <CrudTools.CreateButton createRoute={TRANSPORTADORAS.CREATE_PAGE} title='Nova Transportadora' />
        </CrudTools.Root>
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
