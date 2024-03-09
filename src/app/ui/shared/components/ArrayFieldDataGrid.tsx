import { Box } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { ArrayPath, FieldArrayWithId, FieldValues, UseFieldArrayUpdate } from 'react-hook-form'

export function ArrayFieldDataGrid<T extends FieldValues>({
  columns,
  fields,
  update
}: {
  fields: FieldArrayWithId<T, ArrayPath<T>, 'id'>[]
  columns: GridColDef[]
  update: UseFieldArrayUpdate<T, ArrayPath<T>>
}) {
  const [rows, setRows] = useState(fields)

  useEffect(() => {
    setRows(fields)
  }, [fields])

  const handleRowUpdate = (newRow: any, oldRow: any) => {
    const rowIndex = fields.findIndex(row => row.id === oldRow.id)
    update(rowIndex, newRow)
    const updatedRows = [...fields]
    updatedRows[rowIndex] = newRow
    setRows(updatedRows)
  }

  return (
    <Box display='grid' maxHeight='75vh'>
      <DataGrid
        autoHeight
        pageSizeOptions={[5, 10, 25, 50, 100]}
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        processRowUpdate={handleRowUpdate}
        onProcessRowUpdateError={error => console.error(error)}
      />
    </Box>
  )
}
