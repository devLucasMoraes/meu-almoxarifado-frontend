import { Button } from '@mui/material'

export const SaveSubmitButton = ({ handleSave }: { handleSave?: () => void }) => {
  return (
    <Button type='submit' variant='contained' size='large' onClick={handleSave}>
      Salvar
    </Button>
  )
}
