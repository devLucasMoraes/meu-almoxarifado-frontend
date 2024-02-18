'use client'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { MyDataGrid } from '@/app/ui/shared/components/MyDataGrid'
import { UnderlineLink } from '@/app/ui/shared/components/UnderlineLink'
import { CrudTools } from '@/app/ui/shared/components/crudTools/CrudTools'
import { Environment } from '@/environment'
import { CategoriaQueries } from '@/queries/CategoriaQueries'
import { MaterialQueries } from '@/queries/MaterialQueries'
import { TMaterial } from '@/types/models'
import { Delete, Edit, Preview } from '@mui/icons-material'
import { IconButton, Stack } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const materialQueries = new MaterialQueries()
const categoriaQueries = new CategoriaQueries()

export default function Page() {
  console.log('renderizou MaterialList')

  const { MATERIAIS, CATEGORIAS, LIMITE_DE_LINHAS } = Environment

  const router = useRouter()

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: LIMITE_DE_LINHAS
  })

  const { data, isLoading } = useQuery({
    ...materialQueries.getAll(paginationModel.page, paginationModel.pageSize),
    placeholderData: keepPreviousData
  })

  const { mutate: deleteById } = materialQueries.deleteById()

  function onInfo(params: GridRenderCellParams): void {
    // se existe o id, navega para a página de exibição
    if (!params.row.id) return
    router.push(`${MATERIAIS.SHOW_PAGE.replace('id', params.row.id)}`)
  }

  function onEdit(params: GridRenderCellParams): void {
    // se existe o id, navega para a página de edição
    if (!params.row.id) return
    router.push(`${MATERIAIS.EDIT_PAGE.replace('id', params.row.id)}`)
  }

  function onDelete(params: GridRenderCellParams): void {
    // se existe o id, remove o usuário
    if (!params.row.id) return
    if (confirm('Realmente deseja apagar?')) {
      deleteById(params.row.id)
    }
  }

  const columns: GridColDef<TMaterial>[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'descricao', headerName: 'Descrição', minWidth: 155, flex: 0.3 },
    { field: 'valorUnt', headerName: 'Valor unitario', minWidth: 155, flex: 0.1 },
    { field: 'qtdEmEstoque', headerName: 'Em Estoque', minWidth: 155, flex: 0.1 },
    {
      field: 'idCategoria',
      headerName: 'Categoria',
      minWidth: 220,
      flex: 0.2,
      renderCell: params => (
        <UnderlineLink
          queries={categoriaQueries}
          nameProperty='nome'
          id={params.row.idCategoria}
          linkPath={`${CATEGORIAS.SHOW_PAGE.replace('id', String(params.row.idCategoria))}`}
        />
      )
    },
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
      breadcrumbsPath={[{ label: 'Materiais', to: `${MATERIAIS.LIST_PAGE}` }, { label: 'Listar' }]}
      tools={<CrudTools mostrarBotaoNovo tituloBotaoNovo='Criar Novo' linkBotaoNovo={`${MATERIAIS.CREATE_PAGE}`} />}
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
