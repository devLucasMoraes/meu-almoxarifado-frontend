import { useIsOpenDialog } from '@/store/dialogStore'
import { TItemRequisicaoDeEstoque, TRequisicaoDeEstoque } from '@/types/models'
import { Delete, Inventory } from '@mui/icons-material'
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

export const ItensRequisicaoDeEstoqueArrayField = ({ control }: { control: Control<TRequisicaoDeEstoque> }) => {
  console.log('renderizou ItensRequisicaoDeEstoqueArrayField')

  const { toggleMaterialDialog } = useIsOpenDialog()

  const { append, remove, fields, update } = useFieldArray({
    control: control,
    name: 'itens'
  })

  const { errors } = useFormState({ control })

  const renderAutocompleteCell: GridColDef['renderCell'] = params => {
    const rowIndex = fields.findIndex(field => field.id === params.row.id)
    const erro = errors.itens?.[rowIndex]?.idMaterial

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
    const erro = errors.itens?.[rowIndex]?.undConsumo

    return <SelectCell {...params} errors={erro} />
  }

  const columns: GridColDef<FieldArrayWithId<TRequisicaoDeEstoque, 'itens', 'id'>>[] = [
    { field: 'id', headerName: 'ID', width: 225 },
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
            {errors.itens?.[rowIndex]?.quantEntregue && (
              <div style={{ color: 'red' }}>{errors.itens[rowIndex]?.quantEntregue?.message}</div>
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
            {errors.itens?.[rowIndex]?.valorUntEntregue && (
              <div style={{ color: 'red' }}>{errors.itens[rowIndex]?.valorUntEntregue?.message}</div>
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
      <Grid item flexGrow={1}>
        <Divider textAlign='left'>
          <Chip
            label='Adicionar novo item'
            onClick={() => append({} as TItemRequisicaoDeEstoque)}
            icon={<Inventory />}
          />
        </Divider>
      </Grid>

      <Grid item xs={12} component={Paper} variant='outlined'>
        <ArrayFieldDataGrid columns={columns} fields={fields} update={update} />
      </Grid>
    </Grid>
  )
}
