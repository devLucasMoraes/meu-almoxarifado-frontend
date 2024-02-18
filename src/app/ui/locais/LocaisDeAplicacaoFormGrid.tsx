import { TLocalDeAplicacao } from '@/types/models'
import { Grid } from '@mui/material'
import { Control } from 'react-hook-form'
import { RHFTextField } from '../shared/components/RHFwithMUI/RHFTextField'

export const LocaisDeAplicacaoFormGrid = ({ control }: { control: Control<TLocalDeAplicacao> }) => {
  return (
    <Grid container rowGap={2} columnSpacing={1} marginBottom={2}>
      <Grid item xs={12}>
        <RHFTextField control={control} name='nome' fullWidth placeholder='Nome' />
      </Grid>
    </Grid>
  )
}
