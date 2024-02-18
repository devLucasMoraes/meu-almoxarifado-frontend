import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridValidRowModel } from '@mui/x-data-grid'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export const MyDataGrid = ({
  columns,
  rows,
  totalRowCount,
  setPaginationModel,
  paginationModel,
  isLoading
}: {
  isLoading: boolean
  columns: GridColDef[]
  rows?: GridValidRowModel[]
  totalRowCount?: number
  paginationModel: {
    page: number
    pageSize: number
  }
  setPaginationModel: Dispatch<
    SetStateAction<{
      page: number
      pageSize: number
    }>
  >
}) => {
  const [rowCountState, setRowCountState] = useState(totalRowCount || 0)

  useEffect(() => {
    setRowCountState(prevRowCountState => (totalRowCount !== undefined ? totalRowCount : prevRowCountState))
  }, [totalRowCount])

  return (
    <Box display='grid' maxHeight='75vh'>
      <DataGrid
        autoHeight
        rows={rows ?? []}
        columns={columns}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        disableRowSelectionOnClick
        rowCount={rowCountState}
        paginationModel={paginationModel}
        paginationMode='server'
        onPaginationModelChange={setPaginationModel}
        loading={isLoading}
      />
    </Box>
  )
}
