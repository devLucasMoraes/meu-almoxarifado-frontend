import { Environment } from '@/environment'
import { useMyFieldArray } from '@/hooks/useMyFieldArray'
import { materialQueries } from '@/queries/MaterialQueries'
import { TRequisicaoDeEstoque } from '@/types/models'
import { Delete, Edit, Inventory, Preview } from '@mui/icons-material'
import { Chip, Divider, Grid, IconButton, Paper, Stack } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'
import { Control, FieldArrayWithId } from 'react-hook-form'
import { MyDataGrid } from '../shared/components/MyDataGrid'
import { RHFAutocompleteField } from '../shared/components/RHFwithMUI/RHFAutocompleteField'
import { RHFTextField } from '../shared/components/RHFwithMUI/RHFTextField'
import { UnderlineLink } from '../shared/components/UnderlineLink'

export const ItensRequisicaoDeEstoqueArrayField = ({ control }: { control: Control<TRequisicaoDeEstoque> }) => {
  console.log('renderizou')

  const { LIMITE_DE_LINHAS, MATERIAIS } = Environment

  const { fields, handleAddItem, handleInfo, handleEdit, handleDelete, handleBlur, selectedItemIndex, readOnly } =
    useMyFieldArray({
      control: control,
      name: 'itens',
      nameWhachData: 'itens'
    })

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: LIMITE_DE_LINHAS
  })

  const columns: GridColDef<FieldArrayWithId<TRequisicaoDeEstoque, 'itens', 'id'>>[] = [
    { field: 'idItem', headerName: 'ID', width: 70 },
    {
      field: 'idMaterial',
      headerName: 'Material',
      minWidth: 200,
      flex: 0.3,
      renderCell: params => (
        <UnderlineLink
          queries={materialQueries}
          id={params.row.idMaterial}
          linkPath={`${MATERIAIS.SHOW_PAGE.replace('id', String(params.row.idMaterial))}`}
          nameProperty='descricao'
        />
      )
    },
    { field: 'quantEntregue', headerName: 'Qtde Embalagem', minWidth: 155, flex: 0.2 },
    { field: 'undConsumo', headerName: 'Embalagem', minWidth: 155, flex: 0.2 },
    { field: 'valorUntEntregue', headerName: 'Valor Untitário', minWidth: 155, flex: 0.1 },
    {
      field: 'actions',
      headerName: 'Ações',
      minWidth: 150,
      flex: 0.1,
      sortable: false,
      disableColumnMenu: true,
      renderCell: params => (
        <Stack direction='row' spacing={2}>
          <IconButton color='info' size='small' onClick={() => handleInfo(params)}>
            <Preview fontSize='inherit' />
          </IconButton>

          <IconButton color='info' size='small' onClick={() => handleEdit(params)}>
            <Edit fontSize='inherit' />
          </IconButton>

          <IconButton color='error' size='small' onClick={() => handleDelete(params)}>
            <Delete fontSize='inherit' />
          </IconButton>
        </Stack>
      )
    }
  ]

  return (
    <Grid container rowGap={2}>
      <Grid item flexGrow={1}>
        <Divider textAlign='left'>
          <Chip label='Adicionar novo item' onClick={() => handleAddItem()} icon={<Inventory />} />
        </Divider>
      </Grid>

      {fields
        .filter(field => fields.indexOf(field) === selectedItemIndex)
        .map(field => {
          const originalIndex = fields.indexOf(field)
          return (
            <Grid
              key={field.id}
              container
              component={Paper}
              padding={2}
              rowGap={2}
              columnSpacing={1}
              sx={{ backgroundColor: '#f6f7fb' }}
            >
              <Grid item xs={10} lg={4}>
                <RHFAutocompleteField
                  control={control}
                  name={`itens.${originalIndex}.idMaterial`}
                  placeholder='Materiais/Insumos'
                  queries={materialQueries}
                  onBlur={() => handleBlur(originalIndex)}
                  readOnly={readOnly}
                />
              </Grid>

              <Grid item xs={12} lg={2}>
                <RHFTextField
                  control={control}
                  name={`itens.${originalIndex}.quantEntregue`}
                  placeholder='Quantidade'
                  type='number'
                  fullWidth
                  onBlur={() => handleBlur(originalIndex)}
                  readOnly={readOnly}
                />
              </Grid>

              <Grid item xs={12} lg={3}>
                <RHFTextField
                  control={control}
                  name={`itens.${originalIndex}.undConsumo`}
                  placeholder='Unidade'
                  isSelected='unidade'
                  fullWidth
                  onBlur={() => handleBlur(originalIndex)}
                  readOnly={readOnly}
                />
              </Grid>

              <Grid item xs={12} lg={2}>
                <RHFTextField
                  control={control}
                  name={`itens.${originalIndex}.valorUntEntregue`}
                  placeholder='Valor unitário'
                  type='number'
                  fullWidth
                  onBlur={() => handleBlur(originalIndex)}
                  readOnly={readOnly}
                />
              </Grid>
            </Grid>
          )
        })}

      <Grid item xs={12} component={Paper} variant='outlined'>
        <MyDataGrid
          isLoading={false}
          columns={columns}
          rows={fields}
          totalRowCount={fields.length}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
        />
      </Grid>
    </Grid>
  )
}
