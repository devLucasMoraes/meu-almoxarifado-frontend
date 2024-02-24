import { Environment } from '@/environment'
import { useMyFieldArray } from '@/hooks/useMyFieldArray'
import { materialQueries } from '@/queries/MaterialQueries'
import { TEmprestimo, TItemEmprestimoAReceber } from '@/types/models'
import { Delete, Edit, Preview, Sync } from '@mui/icons-material'
import { Chip, Divider, Grid, IconButton, Paper, Stack } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'
import { Control, FieldArrayWithId } from 'react-hook-form'
import { MyDataGrid } from '../shared/components/MyDataGrid'
import { RHFAutocompleteField } from '../shared/components/RHFwithMUI/RHFAutocompleteField'
import { RHFTextField } from '../shared/components/RHFwithMUI/RHFTextField'

export const ItensEmprestimoArrayField = ({ control }: { control: Control<TEmprestimo> }) => {
  console.log('renderizou ItensEmprestimoArrayField')

  const { LIMITE_DE_LINHAS } = Environment

  const { fields, handleAddItem, handleInfo, handleEdit, handleDelete, handleBlur, readOnly, selectedItemIndex } =
    useMyFieldArray({
      control: control,
      name: 'itensAReceber',
      nameWhachData: 'itensAReceber'
    })

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: LIMITE_DE_LINHAS
  })

  const columns: GridColDef<FieldArrayWithId<TEmprestimo, 'itensAReceber', 'id'>>[] = [
    { field: 'iditem', headerName: 'ID', width: 70 },
    { field: 'idMaterial', headerName: 'Material', minWidth: 155, flex: 0.3 },
    { field: 'quantEntregue', headerName: 'Quantidade', minWidth: 220, flex: 0.2 },
    { field: 'unidade', headerName: 'Unidade', minWidth: 155, flex: 0.1 },
    { field: 'valorUnt', headerName: 'Valor unit', minWidth: 220, flex: 0.2 },
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
      <Grid item xs={12}>
        <Divider textAlign='left'>
          <Chip label='Adicionar item' onClick={() => handleAddItem({} as TItemEmprestimoAReceber)} icon={<Sync />} />
        </Divider>
      </Grid>

      {fields
        .filter(field => fields.indexOf(field) === selectedItemIndex)
        .map(field => {
          const originalIndex = fields.indexOf(field)
          return (
            <Grid key={field.id} container component={Paper} padding={2} gap={2} sx={{ backgroundColor: '#f6f7fb' }}>
              <Grid item xs={4} lg={3}>
                <RHFAutocompleteField
                  control={control}
                  name={`itensAReceber.${originalIndex}.idMaterial`}
                  placeholder='Materiais/Insumos'
                  onBlur={() => handleBlur(originalIndex)}
                  queries={materialQueries}
                />
              </Grid>

              <Grid item xs={4} lg={3}>
                <RHFTextField
                  control={control}
                  name={`itensAReceber.${originalIndex}.quantEntregue`}
                  placeholder='Qtde entregue'
                  type='number'
                  onBlur={() => handleBlur(originalIndex)}
                  readOnly={readOnly}
                  fullWidth
                />
              </Grid>

              <Grid item xs={4} lg={2}>
                <RHFTextField
                  control={control}
                  name={`itensAReceber.${originalIndex}.unidade`}
                  placeholder='Unidade'
                  isSelected='unidade'
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} lg={2}>
                <RHFTextField
                  control={control}
                  name={`itensAReceber.${originalIndex}.valorUnt`}
                  placeholder='Valor unitário'
                  type='number'
                  onBlur={() => handleBlur(originalIndex)}
                  readOnly={readOnly}
                  fullWidth
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
