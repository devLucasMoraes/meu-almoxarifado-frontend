import { Delete } from '@mui/icons-material'
import { Button } from '@mui/material'

export function DeleteButton({ handleDelete }: { handleDelete: () => void }) {
  return (
    <Button color='error' variant='contained' startIcon={<Delete />} onClick={handleDelete}>
      Apagar
    </Button>
  )
}
