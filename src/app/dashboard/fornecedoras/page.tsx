'use client'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { MyDataGrid } from '@/app/ui/shared/components/MyDataGrid'
import { CrudTools } from '@/app/ui/shared/components/crudTools/CrudTools'
import { Environment } from '@/environment'
import { FornecedoraQueries } from '@/queries/FornecedoraQueries'
import { TFornecedora } from '@/types/models'
import { Delete, Edit, Preview } from '@mui/icons-material'
import { IconButton, Stack } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const fornecedoraQueries = new FornecedoraQueries()

export default function Page() {
  console.log('renderizou FornecedoraList')

  const { FORNECEDORAS, LIMITE_DE_LINHAS } = Environment

  const router = useRouter()

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: LIMITE_DE_LINHAS
  })

  const { data, isLoading } = useQuery({
    ...fornecedoraQueries.getAll(paginationModel.page, paginationModel.pageSize),
    placeholderData: keepPreviousData
  })

  const { mutate: deleteById } = fornecedoraQueries.deleteById()

  function onInfo(params: GridRenderCellParams): void {
    // se existe o id, navega para a página de exibição
    if (!params.row.id) return
    router.push(`${FORNECEDORAS.SHOW_PAGE.replace('id', String(params.row.id))}`)
  }

  function onEdit(params: GridRenderCellParams): void {
    // se existe o id, navega para a página de edição
    if (!params.row.id) return
    router.push(`${FORNECEDORAS.EDIT_PAGE.replace('id', String(params.row.id))}`)
  }

  function onDelete(params: GridRenderCellParams): void {
    // se existe o id, remove o usuário
    if (!params.row.id) return
    if (confirm('Realmente deseja apagar?')) {
      deleteById(params.row.id)
    }
  }

  const columns: GridColDef<TFornecedora>[] = [
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
      breadcrumbsPath={[{ label: 'Fornecedoras', to: `${FORNECEDORAS.LIST_PAGE}` }, { label: 'Listar' }]}
      tools={<CrudTools mostrarBotaoNovo tituloBotaoNovo='Nova Fornecedora' linkBotaoNovo={FORNECEDORAS.CREATE_PAGE} />}
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
