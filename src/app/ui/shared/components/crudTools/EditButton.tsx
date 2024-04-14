import { Edit } from '@mui/icons-material'
import { Button } from '@mui/material'
import NextLink from 'next/link'

export function EditButton({ editRoute }: { editRoute: string }) {
  return (
    <Button component={NextLink} href={editRoute} variant='outlined' startIcon={<Edit />}>
      Editar
    </Button>
  )
}
