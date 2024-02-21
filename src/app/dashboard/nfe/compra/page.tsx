'use client'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { MyDataGrid } from '@/app/ui/shared/components/MyDataGrid'
import { UnderlineLink } from '@/app/ui/shared/components/UnderlineLink'
import { CrudTools } from '@/app/ui/shared/components/crudTools/CrudTools'
import { Environment } from '@/environment'
import { FornecedoraQueries } from '@/queries/FornecedoraQueries'
import { NfeDeCompraQueries } from '@/queries/NfeDeCompraQueries'
import { TransportadoraQueries } from '@/queries/TransportadoraQueries'
import { TNfeDeCompra } from '@/types/models'
import { Delete, Edit, Preview } from '@mui/icons-material'
import { IconButton, Stack } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const nfeDeCompraQueries = new NfeDeCompraQueries()
const transportadoraQueries = new TransportadoraQueries()
const fornecedoraQueries = new FornecedoraQueries()

export default function Page() {
  console.log('renderizou NfeDeCompraList')

  const { LIMITE_DE_LINHAS, NFE_DE_COMPRA, FORNECEDORAS, TRANSPORTADORAS } = Environment

  const router = useRouter()

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: LIMITE_DE_LINHAS
  })

  const { data, isLoading } = useQuery({
    ...nfeDeCompraQueries.getAll(paginationModel.page, paginationModel.pageSize),
    placeholderData: keepPreviousData
  })

  const { mutate: deleteById } = nfeDeCompraQueries.deleteById()

  function onInfo(params: GridRenderCellParams): void {
    // se existe o id, navega para a página de exibição
    if (!params.row.id) return
    router.push(`${NFE_DE_COMPRA.SHOW_PAGE.replace('id', String(params.row.id))}`)
  }

  function onEdit(params: GridRenderCellParams): void {
    // se existe o id, navega para a página de edição
    if (!params.row.id) return
    router.push(`${NFE_DE_COMPRA.EDIT_PAGE.replace('id', String(params.row.id))}`)
  }

  function onDelete(params: GridRenderCellParams): void {
    // se existe o id, remove o usuário
    if (!params.row.id) return
    if (confirm('Realmente deseja apagar?')) {
      deleteById(params.row.id)
    }
  }

  const columns: GridColDef<TNfeDeCompra>[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'dataEmissao',
      headerName: 'Emitido em',
      minWidth: 155,
      flex: 0.3,
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value)
    },
    {
      field: 'dataRecebimento',
      headerName: 'Recebido em',
      minWidth: 155,
      flex: 0.3,
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value)
    },
    { field: 'valorIpiTotal', headerName: 'Taxa IPI', minWidth: 155, flex: 0.1 },
    { field: 'valorTotal', headerName: 'Valor total', minWidth: 155, flex: 0.1 },
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
    { field: 'valorFrete', headerName: 'Valor do frete', minWidth: 155, flex: 0.1 },
    {
      field: 'idTransportadora',
      headerName: 'Transportadora',
      minWidth: 200,
      flex: 0.3,
      renderCell: params => (
        <UnderlineLink
          queries={transportadoraQueries}
          id={params.row.idTransportadora}
          linkPath={`${TRANSPORTADORAS.SHOW_PAGE.replace('id', String(params.row.idTransportadora))}`}
          nameProperty='nomeFantasia'
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
      pageTitle='Notas de compra'
      breadcrumbsPath={[{ label: 'Notas', to: `${Environment.NFE_DE_COMPRA.LIST_PAGE}` }, { label: 'Listar' }]}
      tools={
        <CrudTools
          mostrarBotaoNovo
          tituloBotaoNovo='Nova nota fiscal'
          linkBotaoNovo={Environment.NFE_DE_COMPRA.CREATE_PAGE}
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
