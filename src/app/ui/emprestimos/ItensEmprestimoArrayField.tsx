import { Environment } from '@/environment'
import { TEmprestimo, TItemEmprestimoAReceber } from '@/types/models'
import { Delete, Sync } from '@mui/icons-material'
import { Chip, Divider, Grid, Paper } from '@mui/material'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { Control, FieldArrayWithId, useFieldArray, useFormState } from 'react-hook-form'
import { ArrayFieldDataGrid } from '../shared/components/ArrayFieldDataGrid'
import {
  AutocompleteCell,
  AutocompleteEditInputCell,
  SelectCell,
  SelectEditInputCell
} from '../shared/components/DataGridCells'

export const ItensEmprestimoArrayField = ({ control }: { control: Control<TEmprestimo> }) => {
  console.log('renderizou ItensEmprestimoArrayField')

  const { LIMITE_DE_LINHAS } = Environment

  const { append, remove, fields, update } = useFieldArray({
    control: control,
    name: 'itensAReceber'
  })

  const { errors } = useFormState({ control })

  const renderAutocompleteCell: GridColDef['renderCell'] = params => {
    const rowIndex = fields.findIndex(field => field.id === params.row.id)
    const erro = errors.itensAPagar?.[rowIndex]?.idMaterial

    return <AutocompleteCell {...params} errors={erro} />
  }

  const renderAutocompleteEditInputCell: GridColDef['renderCell'] = params => {
    return <AutocompleteEditInputCell {...params} />
  }

  const renderSelectEditInputCell: GridColDef['renderCell'] = params => {
    return <SelectEditInputCell {...params} />
  }

  const renderSelectCell: GridColDef['renderCell'] = params => {
    const rowIndex = fields.findIndex(field => field.id === params.row.id)
    const erro = errors.itensAPagar?.[rowIndex]?.unidade

    return <SelectCell {...params} errors={erro} />
  }

  const columns: GridColDef<FieldArrayWithId<TEmprestimo, 'itensAPagar', 'id'>>[] = [
    { field: 'iditem', headerName: 'ID', width: 70 },
    {
      field: 'idMaterial',
      headerName: 'Material',
      minWidth: 200,
      flex: 0.3,
      editable: true,
      renderEditCell: renderAutocompleteEditInputCell,
      renderCell: renderAutocompleteCell
    },
    {
      field: 'quantEntregue',
      headerName: 'Qtde Entregue',
      minWidth: 155,
      flex: 0.2,
      editable: true,
      type: 'number',
      renderCell: params => {
        const rowIndex = fields.findIndex(field => field.id === params.row.id)
        return (
          <div>
            {params.value}
            {errors.itensAPagar?.[rowIndex]?.quantEntregue && (
              <div style={{ color: 'red' }}>{errors.itensAPagar[rowIndex]?.quantEntregue?.message}</div>
            )}
          </div>
        )
      }
    },
    {
      field: 'undConsumo',
      headerName: 'Unidade Consumo',
      minWidth: 155,
      flex: 0.2,
      editable: true,
      renderEditCell: renderSelectEditInputCell,
      renderCell: renderSelectCell
    },
    {
      field: 'valorUntEntregue',
      headerName: 'Valor Untitário',
      minWidth: 155,
      flex: 0.1,
      editable: true,
      type: 'number',
      renderCell: params => {
        const rowIndex = fields.findIndex(field => field.id === params.row.id)
        return (
          <div>
            {params.value}
            {errors.itensAPagar?.[rowIndex]?.valorUnt && (
              <div style={{ color: 'red' }}>{errors.itensAPagar[rowIndex]?.valorUnt?.message}</div>
            )}
          </div>
        )
      }
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      minWidth: 130,
      flex: 0.1,
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
          <Chip label='Adicionar item' onClick={() => append({} as TItemEmprestimoAReceber)} icon={<Sync />} />
        </Divider>
      </Grid>

      <Grid item xs={12} component={Paper} variant='outlined'>
        <ArrayFieldDataGrid columns={columns} fields={fields} update={update} />
      </Grid>
    </Grid>
  )
}
