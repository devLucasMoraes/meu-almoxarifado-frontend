import { Delete } from '@mui/icons-material'
import { Button } from '@mui/material'

export function DeleteButton({
  handleDelete,
  name = 'Apagar',
  startIcon = false
}: {
  handleDelete: () => void
  name?: string
  startIcon?: boolean
}) {
  return (
    <Button color='error' variant='contained' startIcon={startIcon ? <Delete /> : ''} onClick={handleDelete}>
      {name}
    </Button>
  )
}
