import { Clear } from '@mui/icons-material'
import { Button } from '@mui/material'

export const ResetButton = ({ handleReset }: { handleReset?: () => void }) => {
  return (
    <Button color='error' variant='contained' startIcon={<Clear />} onClick={handleReset}>
      Reset
    </Button>
  )
}
