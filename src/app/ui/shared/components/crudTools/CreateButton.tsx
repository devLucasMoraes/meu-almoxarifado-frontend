import { Button } from '@mui/material'
import NextLink from 'next/link'

export function CreateButton({ createRoute, title }: { createRoute: string; title: string }) {
  return (
    <Button component={NextLink} href={createRoute} variant='contained'>
      {title}
    </Button>
  )
}
