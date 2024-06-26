import { Environment } from '@/environment'
import { useMyFieldArray } from '@/hooks/useMyFieldArray'
import { fornecedoraQueries } from '@/queries/FornecedoraQueries'
import { useIsOpenDialog } from '@/store/dialogStore'
import { TMaterial, TVinculoMaterialFornecedora } from '@/types/models'
import { Delete, Edit, Factory, Preview } from '@mui/icons-material'
import { Chip, Divider, Grid, IconButton, Paper, Stack } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'
import { Control, FieldArrayWithId } from 'react-hook-form'
import { AddButton } from '../shared/components/CrudTools/AddButton'
import { MyDataGrid } from '../shared/components/MyDataGrid'
import { RHFAutocompleteField } from '../shared/components/RHFwithMUI/RHFAutocompleteField'
import { RHFTextField } from '../shared/components/RHFwithMUI/RHFTextField'
import { ConversaoDeCompraArrayField } from './ConversaoDeCompraArrayField'

export function VinculoComFornecedorasArrayField({ control }: { control: Control<TMaterial> }) {
  console.log('renderizou VinculoComFornecedorasArrayField')

  const { LIMITE_DE_LINHAS } = Environment

  const { toggleFornecedoraDialog } = useIsOpenDialog()

  const { fields, handleAddItem, handleInfo, handleEdit, handleDelete, handleBlur, selectedItemIndex, readOnly } =
    useMyFieldArray({
      control: control,
      name: 'fornecedorasVinculadas',
      nameWhachData: 'fornecedorasVinculadas'
    })

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: LIMITE_DE_LINHAS
  })

  const columns: GridColDef<FieldArrayWithId<TMaterial, 'fornecedorasVinculadas', 'id'>>[] = [
    { field: 'idVinculo', headerName: 'ID', width: 70 },
    { field: 'idFornecedora', headerName: 'Fornecedora', minWidth: 155, flex: 0.3 },
    { field: 'referenciaFornecedora', headerName: 'Referencia', minWidth: 220, flex: 0.2 },
    { field: 'descricaoFornecedora', headerName: 'Descricao', minWidth: 155, flex: 0.1 },
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
      <Grid xs={12} item flexGrow={1}>
        <Divider textAlign='left'>
          <Chip
            label='Novo vinculo com fornecedora'
            onClick={() => handleAddItem({} as TVinculoMaterialFornecedora)}
            icon={<Factory />}
          />
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
              rowGap={2}
              padding={2}
              component={Paper}
              sx={{ backgroundColor: '#f6f7fb' }}
              alignItems='flex-end'
            >
              <Grid item xs={10} textAlign='end'>
                <AddButton title='Nova Fornecedora' handleAdd={() => toggleFornecedoraDialog(true)} />
                <RHFAutocompleteField
                  queries={fornecedoraQueries}
                  control={control}
                  name={`fornecedorasVinculadas.${originalIndex}.idFornecedora`}
                  placeholder='Fornecedora'
                  onBlur={() => handleBlur(originalIndex)}
                  readOnly={readOnly}
                />
              </Grid>

              <Grid item xs={8}>
                <RHFTextField
                  control={control}
                  name={`fornecedorasVinculadas.${originalIndex}.referenciaFornecedora`}
                  placeholder='Código Produto'
                  onBlur={() => handleBlur(originalIndex)}
                  readOnly={readOnly}
                />
              </Grid>

              <ConversaoDeCompraArrayField control={control} nestIndex={originalIndex} />
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
