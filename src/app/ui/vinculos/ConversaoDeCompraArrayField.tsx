import { TConversaoDeCompra, TVinculoMaterialFornecedora } from '@/types/models'
import { Delete, Sync } from '@mui/icons-material'
import { Chip, Divider, Grid, Paper } from '@mui/material'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { Control, FieldArrayWithId, useFieldArray, useFormState } from 'react-hook-form'
import { ArrayFieldDataGrid } from '../shared/components/ArrayFieldDataGrid'

export function ConversaoDeCompraArrayField({ control }: { control: Control<TVinculoMaterialFornecedora> }) {
  console.log('renderizou ConversaoDeCompraArrayField')

  const { append, remove, fields, update } = useFieldArray({
    control: control,
    name: 'conversoesDeCompra'
  })

  const { errors } = useFormState({ control })

  const columns: GridColDef<FieldArrayWithId<TVinculoMaterialFornecedora, 'conversoesDeCompra', 'id'>>[] = [
    { field: 'idConversao', headerName: 'ID', width: 70 },
    {
      field: 'undCompra',
      headerName: 'Embalagem',
      minWidth: 155,
      flex: 0.3,
      editable: true,
      renderCell: params => {
        const rowIndex = fields.findIndex(field => field.id === params.row.id)
        return (
          <div>
            {params.value}
            {errors.conversoesDeCompra?.[rowIndex]?.undCompra && (
              <div style={{ color: 'red' }}>{errors.conversoesDeCompra[rowIndex]?.undCompra?.message}</div>
            )}
          </div>
        )
      }
    },
    {
      field: 'fatorDeConversao',
      headerName: 'Qtde Embalagem',
      minWidth: 220,
      flex: 0.2,
      type: 'number',
      editable: true,
      renderCell: params => {
        const rowIndex = fields.findIndex(field => field.id === params.row.id)
        return (
          <div>
            {params.value}
            {errors.conversoesDeCompra?.[rowIndex]?.fatorDeConversao && (
              <div style={{ color: 'red' }}>{errors.conversoesDeCompra[rowIndex]?.fatorDeConversao?.message}</div>
            )}
          </div>
        )
      }
    },
    {
      field: 'undEstoque',
      headerName: 'Unidade de Estoque',
      minWidth: 155,
      flex: 0.1,
      editable: true,
      renderCell: params => {
        const rowIndex = fields.findIndex(field => field.id === params.row.id)
        return (
          <div>
            {params.value}
            {errors.conversoesDeCompra?.[rowIndex]?.undEstoque && (
              <div style={{ color: 'red' }}>{errors.conversoesDeCompra[rowIndex]?.undEstoque?.message}</div>
            )}
          </div>
        )
      }
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const removeItem = () => {
          const rowIndex = fields.findIndex(row => row.id === id)
          remove(rowIndex)
        }

        return [<GridActionsCellItem key={id} icon={<Delete />} label='Remover' onClick={removeItem} color='inherit' />]
      }
    }
  ]

  return (
    <Grid container rowGap={2}>
      <Grid item xs={12}>
        <Divider textAlign='left'>
          <Chip label='Nova conversão de compra' onClick={() => append({} as TConversaoDeCompra)} icon={<Sync />} />
        </Divider>
      </Grid>

      <Grid item xs={12} component={Paper} variant='outlined' sx={{ backgroundColor: '#f6f7fb' }}>
        <ArrayFieldDataGrid columns={columns} fields={fields} update={update} />
      </Grid>
    </Grid>
  )
}
