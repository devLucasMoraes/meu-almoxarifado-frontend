import { PreviewOutlined } from '@mui/icons-material'
import { Button } from '@mui/material'
import NextLink from 'next/link'

export function ShowButton({ showRoute }: { showRoute: string }) {
  return (
    <Button component={NextLink} href={showRoute} startIcon={<PreviewOutlined />} variant='outlined'>
      Exibir
    </Button>
  )
}
