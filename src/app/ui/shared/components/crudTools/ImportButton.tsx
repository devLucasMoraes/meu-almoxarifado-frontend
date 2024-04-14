import { Download } from '@mui/icons-material'
import { Button, Input, Typography } from '@mui/material'

export function ImportButton({ handleImport }: { handleImport: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <Button color='primary' variant='outlined' component='label' startIcon={<Download />}>
      <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
        IMPORTAR XML
      </Typography>

      <Input inputProps={{ accept: '.xml' }} type='file' sx={{ display: 'none' }} onChange={handleImport} />
    </Button>
  )
}
