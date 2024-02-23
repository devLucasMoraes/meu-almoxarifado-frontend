'use client'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { MyDataGrid } from '@/app/ui/shared/components/MyDataGrid'
import { UnderlineLink } from '@/app/ui/shared/components/UnderlineLink'
import { CrudTools } from '@/app/ui/shared/components/crudTools/CrudTools'
import { Environment } from '@/environment'
import { LocalDeAplicacaoQueries } from '@/queries/LocalDeAplicacaoQueries'
import { RequisicaoDeEstoqueQueries } from '@/queries/RequisicaoDeEstoqueQueries'
import { RequisitanteQueries } from '@/queries/RequisitanteQueries'
import { TRequisicaoDeEstoque } from '@/types/models'
import { Delete, Edit, Preview } from '@mui/icons-material'
import { IconButton, Stack } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const requisicaoDeEstoqueQueries = new RequisicaoDeEstoqueQueries()
const requisitanteQueries = new RequisitanteQueries()
const localDeAplicacaoQueries = new LocalDeAplicacaoQueries()

export default function Page() {
  console.log('renderizou RequisicaoDeEstoqueList')

  const { REQUISICOES_DE_ESTOQUE, LIMITE_DE_LINHAS, REQUISITANTES, LOCAIS_DE_APLICACAO } = Environment

  const router = useRouter()

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: LIMITE_DE_LINHAS
  })

  const { data, isLoading } = useQuery({
    ...requisicaoDeEstoqueQueries.getAll(paginationModel.page, paginationModel.pageSize),
    placeholderData: keepPreviousData
  })

  const { mutate: deleteById } = requisicaoDeEstoqueQueries.deleteById()

  function onInfo(params: GridRenderCellParams): void {
    // se existe o id, navega para a página de exibição
    if (!params.row.id) return
    router.push(`${REQUISICOES_DE_ESTOQUE.SHOW_PAGE.replace('id', params.row.id)}`)
  }

  function onEdit(params: GridRenderCellParams): void {
    // se existe o id, navega para a página de edição
    if (!params.row.id) return
    router.push(`${REQUISICOES_DE_ESTOQUE.EDIT_PAGE.replace('id', params.row.id)}`)
  }

  function onDelete(params: GridRenderCellParams): void {
    // se existe o id, remove o usuário
    if (!params.row.id) return
    if (confirm('Realmente deseja apagar?')) {
      deleteById(params.row.id)
    }
  }

  const columns: GridColDef<TRequisicaoDeEstoque>[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'dataRequisicao',
      headerName: 'Requerido em',
      minWidth: 155,
      flex: 0.3,
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value)
    },
    { field: 'valorTotal', headerName: 'Valor total', minWidth: 155, flex: 0.1 },
    {
      field: 'idRequisitante',
      headerName: 'Requisitante',
      minWidth: 200,
      flex: 0.3,
      renderCell: params => (
        <UnderlineLink
          queries={requisitanteQueries}
          id={params.row.idRequisitante}
          linkPath={`${REQUISITANTES.SHOW_PAGE.replace('id', String(params.row.idRequisitante))}`}
          nameProperty='nome'
        />
      )
    },
    {
      field: 'idDestino',
      headerName: 'Destino',
      minWidth: 200,
      flex: 0.3,
      renderCell: params => (
        <UnderlineLink
          queries={localDeAplicacaoQueries}
          id={params.row.idLocalDeAplicacao}
          linkPath={`${LOCAIS_DE_APLICACAO.SHOW_PAGE.replace('id', String(params.row.idLocalDeAplicacao))}`}
          nameProperty='nome'
        />
      )
    },
    {
      field: 'actions',
      type: 'actions',
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
      pageTitle='Requisições de Estoque'
      breadcrumbsPath={[{ label: 'Requisições', to: `${REQUISICOES_DE_ESTOQUE.LIST_PAGE}` }, { label: 'Listar' }]}
      tools={
        <CrudTools
          mostrarBotaoNovo
          tituloBotaoNovo='Nova Requisição'
          linkBotaoNovo={REQUISICOES_DE_ESTOQUE.CREATE_PAGE}
        />
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
