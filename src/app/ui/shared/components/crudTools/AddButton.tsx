import { AddBoxSharp } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'

export function AddButton({ handleAdd, title }: { handleAdd?: () => void; title: string }) {
  return (
    <Tooltip title={title}>
      <IconButton color='primary' size='small' onClick={handleAdd}>
        <AddBoxSharp />
      </IconButton>
    </Tooltip>
  )
}
