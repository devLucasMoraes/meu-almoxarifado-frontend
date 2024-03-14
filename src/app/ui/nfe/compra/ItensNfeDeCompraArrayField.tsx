import { useIsOpenDialog } from '@/store/dialogStore'
import { TItemNfeDeCompra, TNfeDeCompra } from '@/types/models'
import { Delete, Inventory } from '@mui/icons-material'
import { Chip, Divider, Grid, Paper } from '@mui/material'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { Control, FieldArrayWithId, useFieldArray, useFormState } from 'react-hook-form'
import { ArrayFieldDataGrid } from '../../shared/components/ArrayFieldDataGrid'
import { VinculoMaterialButton } from '../../shared/components/CrudTools/VinculoMaterialButton'

export const ItensNfeDeCompraArrayField = ({ control }: { control: Control<TNfeDeCompra> }) => {
  console.log('renderizou ItensNfeDeCompraArrayField')

  const { toggleMaterialDialog } = useIsOpenDialog()

  const { append, remove, fields, update } = useFieldArray({
    control: control,
    name: 'itens'
  })

  const { errors } = useFormState({ control })

  const columns: GridColDef<FieldArrayWithId<TNfeDeCompra, 'itens', 'id'>>[] = [
    {
      field: 'referenciaFornecedora',
      headerName: 'Referencia',
      width: 150,
      editable: true,
      renderCell: params => {
        const rowIndex = fields.findIndex(field => field.id === params.row.id)
        return (
          <div>
            {params.value}
            {errors.itens?.[rowIndex]?.referenciaFornecedora && (
              <div style={{ color: 'red' }}>{errors.itens[rowIndex]?.referenciaFornecedora?.message}</div>
            )}
          </div>
        )
      }
    },
    {
      field: 'descricaoFornecedora',
      headerName: 'Descricao',
      width: 150,
      editable: true,
      renderCell: params => {
        const rowIndex = fields.findIndex(field => field.id === params.row.id)
        return (
          <div>
            {params.value}
            {errors.itens?.[rowIndex]?.descricaoFornecedora && (
              <div style={{ color: 'red' }}>{errors.itens[rowIndex]?.descricaoFornecedora?.message}</div>
            )}
          </div>
        )
      }
    },
    {
      field: 'idMaterial',
      headerName: 'Material',
      minWidth: 200,
      flex: 0.3,
      renderCell: params => <VinculoMaterialButton id={params.row.idMaterial} />
    },
    {
      field: 'undCom',
      headerName: 'Unidade',
      width: 150,
      editable: true,
      renderCell: params => {
        const rowIndex = fields.findIndex(field => field.id === params.row.id)
        return (
          <div>
            {params.value}
            {errors.itens?.[rowIndex]?.undCom && (
              <div style={{ color: 'red' }}>{errors.itens[rowIndex]?.undCom?.message}</div>
            )}
          </div>
        )
      }
    },
    {
      field: 'quantCom',
      headerName: 'Quantidade',
      width: 150,
      editable: true,
      type: 'number',
      renderCell: params => {
        const rowIndex = fields.findIndex(field => field.id === params.row.id)
        return (
          <div>
            {params.value}
            {errors.itens?.[rowIndex]?.quantCom && (
              <div style={{ color: 'red' }}>{errors.itens[rowIndex]?.quantCom?.message}</div>
            )}
          </div>
        )
      }
    },
    {
      field: 'valorUntCom',
      headerName: 'Valor Unit.',
      width: 150,
      editable: true,
      type: 'number',
      renderCell: params => {
        const rowIndex = fields.findIndex(field => field.id === params.row.id)
        return (
          <div>
            {params.value}
            {errors.itens?.[rowIndex]?.valorUntCom && (
              <div style={{ color: 'red' }}>{errors.itens[rowIndex]?.valorUntCom?.message}</div>
            )}
          </div>
        )
      }
    },
    {
      field: 'valorIpi',
      headerName: 'IPI',
      width: 150,
      editable: true,
      type: 'number',
      renderCell: params => {
        const rowIndex = fields.findIndex(field => field.id === params.row.id)
        return (
          <div>
            {params.value}
            {errors.itens?.[rowIndex]?.valorIpi && (
              <div style={{ color: 'red' }}>{errors.itens[rowIndex]?.valorIpi?.message}</div>
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
      <Grid item flexGrow={1}>
        <Divider textAlign='left'>
          <Chip label='Adicionar novo item' onClick={() => append({} as TItemNfeDeCompra)} icon={<Inventory />} />
        </Divider>
      </Grid>

      <Grid item xs={12} component={Paper} variant='outlined'>
        <ArrayFieldDataGrid columns={columns} fields={fields} update={update} />
      </Grid>
    </Grid>
  )
}
