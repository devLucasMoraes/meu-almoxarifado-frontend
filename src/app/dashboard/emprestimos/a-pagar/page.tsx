'use client'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { CrudTools } from '@/app/ui/shared/components/CrudTools'
import { MyDataGrid } from '@/app/ui/shared/components/MyDataGrid'
import { UnderlineLink } from '@/app/ui/shared/components/UnderlineLink'
import { Environment } from '@/environment'
import { emprestimoAPagarQueries } from '@/queries/EmprestimoAPagarQueries'
import { fornecedoraQueries } from '@/queries/FornecedoraQueries'
import { TEmprestimo } from '@/types/models'
import { Delete, Edit, Preview } from '@mui/icons-material'
import { IconButton, Stack } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  console.log('renderizou EmprestimoList')

  const { LIMITE_DE_LINHAS, EMPRESTIMO, FORNECEDORAS } = Environment

  const router = useRouter()

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: LIMITE_DE_LINHAS
  })

  const { data, isLoading } = useQuery({
    ...emprestimoAPagarQueries.getAll(paginationModel.page, paginationModel.pageSize),
    placeholderData: keepPreviousData
  })

  const { mutate: deleteById } = emprestimoAPagarQueries.deleteById()

  function onInfo(params: GridRenderCellParams): void {
    // se existe o id, navega para a página de exibição
    if (!params.row.id) return
    router.push(`${EMPRESTIMO.A_PAGAR.SHOW_PAGE.replace('id', params.row.id)}`)
  }

  function onEdit(params: GridRenderCellParams): void {
    // se existe o id, navega para a página de edição
    if (!params.row.id) return
    router.push(`${EMPRESTIMO.A_PAGAR.EDIT_PAGE.replace('id', params.row.id)}`)
  }

  function onDelete(params: GridRenderCellParams): void {
    // se existe o id, remove o usuário
    if (!params.row.id) return
    if (confirm('Realmente deseja apagar?')) {
      deleteById(params.row.id)
    }
  }

  const columns: GridColDef<TEmprestimo>[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'data', headerName: 'Data', minWidth: 155, flex: 0.2 },
    { field: 'valorTotal', headerName: 'Valor Total', minWidth: 220, flex: 0.1 },
    {
      field: 'idFornecedora',
      headerName: 'Fornecedora',
      minWidth: 200,
      flex: 0.3,
      renderCell: params => (
        <UnderlineLink
          queries={fornecedoraQueries}
          id={params.row.idFornecedora}
          linkPath={`${FORNECEDORAS.SHOW_PAGE.replace('id', String(params.row.idFornecedora))}`}
          nameProperty='nomeFantasia'
        />
      )
    },
    { field: 'situacao', headerName: 'Situacao', minWidth: 220, flex: 0.2 },
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
      breadcrumbsPath={[{ label: 'Emprestimos a pagar', to: `${EMPRESTIMO.A_PAGAR.LIST_PAGE}` }, { label: 'Listar' }]}
      tools={
        <CrudTools.Root>
          <CrudTools.CreateButton createRoute={EMPRESTIMO.A_PAGAR.CREATE_PAGE} title='Novo Emprestimo' />
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
