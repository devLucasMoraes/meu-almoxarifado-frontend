import { AddBox } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export const AddButton = ({ handleAdd }: { handleAdd?: () => void }) => {
  return (
    <IconButton color='info' onClick={handleAdd}>
      <AddBox />
    </IconButton>
  )
}
