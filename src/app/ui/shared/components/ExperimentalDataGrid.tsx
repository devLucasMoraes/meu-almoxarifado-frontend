import { Environment } from '@/environment'
import { TItemNfeDeCompra, TNfeDeCompra } from '@/types/models'
import { Cancel, Delete, Edit, Save } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRenderCellParams,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridToolbarContainer
} from '@mui/x-data-grid'
import { useState } from 'react'
import { ArrayPath, Control, FieldArrayWithId, UseFieldArrayAppend, useFieldArray } from 'react-hook-form'
import { RHFTextField } from './RHFwithMUI/RHFTextField'
import { VinculoMaterialButton } from './crudTools/VinculoMaterialButton'

function EditToolbar({ append }: { append: UseFieldArrayAppend<TNfeDeCompra, 'itens'> }) {
  const handleClick = () => {
    append({} as TItemNfeDeCompra)
  }

  return (
    <GridToolbarContainer>
      <Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>
        Adicionar novo item
      </Button>
    </GridToolbarContainer>
  )
}

export function ExperimentalDataGrid({ control }: { control: Control<TNfeDeCompra> }) {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})

  const { MATERIAIS } = Environment

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'itens'
  })

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick =
    (params: GridRenderCellParams<FieldArrayWithId<TNfeDeCompra, ArrayPath<TNfeDeCompra>, 'id'>>) => () => {
      setRowModesModel({ ...rowModesModel, [params.id]: { mode: GridRowModes.View } })
    }

  const handleDeleteClick = (row: FieldArrayWithId<TNfeDeCompra, 'itens', 'id'>) => () => {
    remove(fields.indexOf(row))
  }

  const handleCancelClick =
    (params: GridRenderCellParams<FieldArrayWithId<TNfeDeCompra, ArrayPath<TNfeDeCompra>, 'id'>>) => () => {
      console.log('handleCancelClick params', params)
      console.log('handleCancelClick fields', fields)
      console.log('handleCancelClick rowModesModel', rowModesModel)

      setRowModesModel({
        ...rowModesModel,
        [params.id]: { mode: GridRowModes.View, ignoreModifications: true }
      })
    }

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow }

    return updatedRow
  }

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel)
  }

  const columns: GridColDef<FieldArrayWithId<TNfeDeCompra, 'itens', 'id'>>[] = [
    { field: 'idItem', headerName: 'ID', width: 70 },
    {
      field: 'referenciaFornecedora',
      headerName: 'Referencia',
      minWidth: 220,
      flex: 0.2,
      //editable: true,
      renderCell: params => (
        <RHFTextField
          variant='standard'
          control={control}
          name={`itens.${fields.indexOf(params.row)}.referenciaFornecedora`}
          fullWidth
          //onBlur={() => handleBlur(originalIndex)}
          //readOnly={vinculoStatus}
        />
      )
    },
    {
      field: 'descricaoFornecedora',
      headerName: 'Descricao',
      minWidth: 220,
      flex: 0.2,
      //editable: true,
      renderCell: params => (
        <RHFTextField
          variant='standard'
          control={control}
          name={`itens.${fields.indexOf(params.row)}.descricaoFornecedora`}
          fullWidth
          //onBlur={() => handleBlur(originalIndex)}
          //readOnly={vinculoStatus}
        />
      )
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
      minWidth: 155,
      flex: 0.1,
      //editable: true,
      renderCell: params => (
        <RHFTextField
          variant='standard'
          control={control}
          name={`itens.${fields.indexOf(params.row)}.undCom`}
          fullWidth
          isSelected='unidade'
          //onBlur={() => handleBlur(originalIndex)}
          //readOnly={vinculoStatus}
        />
      )
    },
    {
      field: 'quantCom',
      headerName: 'Quantidade',
      minWidth: 110,
      flex: 0.1,
      //editable: true,
      renderCell: params => (
        <RHFTextField
          variant='standard'
          control={control}
          name={`itens.${fields.indexOf(params.row)}.quantCom`}
          fullWidth
          type='number'
          //onBlur={() => handleBlur(originalIndex)}
          //readOnly={vinculoStatus}
        />
      )
    },
    {
      field: 'valorUntCom',
      headerName: 'Valor Unit.',
      minWidth: 110,
      flex: 0.1,
      //editable: true,
      renderCell: params => (
        <RHFTextField
          variant='standard'
          control={control}
          name={`itens.${fields.indexOf(params.row)}.valorUntCom`}
          fullWidth
          type='number'
          //onBlur={() => handleBlur(originalIndex)}
          //readOnly={vinculoStatus}
        />
      )
    },
    {
      field: 'valorIpi',
      headerName: 'IPI',
      minWidth: 110,
      flex: 0.1,
      //editable: true,
      renderCell: params => (
        <RHFTextField
          variant='standard'
          control={control}
          name={`itens.${fields.indexOf(params.row)}.valorIpi`}
          fullWidth
          type='number'
          //onBlur={() => handleBlur(originalIndex)}
          //readOnly={vinculoStatus}
        />
      )
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: params => {
        const isInEditMode = rowModesModel[params.id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={params.id}
              icon={<Save />}
              label='Save'
              sx={{
                color: 'primary.main'
              }}
              //onClick={handleSaveClick(params)}
            />,
            <GridActionsCellItem
              key={params.id}
              icon={<Cancel />}
              label='Cancel'
              className='textPrimary'
              //onClick={handleCancelClick(params)}
              color='inherit'
            />
          ]
        }

        return [
          <GridActionsCellItem
            key={params.id}
            icon={<Edit />}
            label='Edit'
            className='textPrimary'
            //onClick={handleEditClick(params.id)}
            color='inherit'
          />,
          <GridActionsCellItem
            key={params.id}
            icon={<Delete />}
            label='Delete'
            onClick={handleDeleteClick(params.row)}
            color='inherit'
          />
        ]
      }
    }
  ]

  return (
    <Box
      maxHeight='75vh'
      display='grid'
      sx={{
        '& .actions': {
          color: 'text.secondary'
        },
        '& .textPrimary': {
          color: 'text.primary'
        }
      }}
    >
      <DataGrid
        autoHeight
        rows={fields}
        columns={columns}
        //editMode='row'
        //rowModesModel={rowModesModel}
        //onRowModesModelChange={handleRowModesModelChange}
        //onRowEditStop={handleRowEditStop}
        //processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar
        }}
        slotProps={{
          toolbar: { append }
        }}
      />
    </Box>
  )
}
