import { MyDataGrid } from '@/app/ui/shared/components/MyDataGrid'
import { Environment } from '@/environment'
import { useMyFieldArray } from '@/hooks/useMyFieldArray'
import { TCategoria, TConversaoDeConsumo } from '@/types/models'
import { Delete, Edit, Preview, Sync } from '@mui/icons-material'
import { Chip, Divider, Grid, IconButton, Paper, Stack } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'
import { Control, FieldArrayWithId } from 'react-hook-form'
import { RHFTextField } from '../shared/components/RHFwithMUI/RHFTextField'

export const ConversoesDeConsumoArrayField = ({
  undEstoqueAtual,
  control
}: {
  control: Control<TCategoria>
  undEstoqueAtual: string
}) => {
  const { fields, handleAddItem, handleInfo, handleEdit, handleDelete, handleBlur, readOnly, selectedItemIndex } =
    useMyFieldArray({
      control: control,
      name: 'conversoesDeConsumo',
      nameWhachData: 'conversoesDeConsumo'
    })

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: Environment.LIMITE_DE_LINHAS
  })

  const columns: GridColDef<FieldArrayWithId<TCategoria, 'conversoesDeConsumo', 'id'>>[] = [
    { field: 'idConversao', headerName: 'ID', width: 70 },
    { field: 'undConsumo', headerName: 'Embalagem', minWidth: 155, flex: 0.3 },
    { field: 'fatorDeConversao', headerName: 'Qtde Embalagem', minWidth: 220, flex: 0.2 },
    { field: 'undEstoque', headerName: 'Unidade de Estoque', minWidth: 155, flex: 0.1 },
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
          <Chip
            label='Adicionar conversão'
            onClick={() => handleAddItem({ undEstoque: undEstoqueAtual } as TConversaoDeConsumo)}
            icon={<Sync />}
          />
        </Divider>
      </Grid>

      {fields
        .filter(field => fields.indexOf(field) === selectedItemIndex && field.undEstoque === undEstoqueAtual)
        .map(field => {
          const originalIndex = fields.indexOf(field)
          return (
            <Grid
              key={field.id}
              container
              padding={2}
              component={Paper}
              columnGap={2}
              sx={{ backgroundColor: '#f6f7fb' }}
            >
              <Grid item xs={6}>
                <RHFTextField
                  control={control}
                  name={`conversoesDeConsumo.${originalIndex}.undConsumo`}
                  placeholder='Embalagem'
                  isSelected='unidade'
                  fullWidth
                  onBlur={() => handleBlur(originalIndex)}
                  readOnly={readOnly}
                />
              </Grid>

              <Grid item xs={4}>
                <RHFTextField
                  control={control}
                  name={`conversoesDeConsumo.${originalIndex}.fatorDeConversao`}
                  placeholder='Qtde Embalagem'
                  type='number'
                  endAdornment={undEstoqueAtual}
                  onBlur={() => handleBlur(originalIndex)}
                  readOnly={readOnly}
                />
              </Grid>

              <Grid item xs={2} display='none'>
                <RHFTextField
                  control={control}
                  name={`conversoesDeConsumo.${originalIndex}.undEstoque`}
                  placeholder='Unidade de estoque'
                  isSelected='unidade'
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
          rows={fields.filter(field => field.undEstoque === undEstoqueAtual)}
          totalRowCount={fields.length}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
        />
      </Grid>
    </Grid>
  )
}
