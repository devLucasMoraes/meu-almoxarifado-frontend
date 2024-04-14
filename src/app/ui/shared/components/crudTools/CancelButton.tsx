import { Button } from '@mui/material'
import NextLink from 'next/link'

export function CancelButton({
  handleCancel,
  isPreviousRoute
}: {
  handleCancel?: () => void
  isPreviousRoute?: boolean
}) {
  return (
    <Button component={NextLink} href={isPreviousRoute ? '..' : ''} size='large' onClick={handleCancel}>
      Cancelar
    </Button>
  )
}
