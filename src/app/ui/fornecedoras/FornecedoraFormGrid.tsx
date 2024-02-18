import { TFornecedora } from '@/types/models'
import { Grid } from '@mui/material'
import { Control } from 'react-hook-form'
import { RHFTextField } from '../shared/components/RHFwithMUI/RHFTextField'

export const FornecedoraFormGrid = ({ control }: { control: Control<TFornecedora> }) => {
  return (
    <Grid container rowGap={2} columnSpacing={1} marginBottom={2}>
      <Grid item xs={12}>
        <RHFTextField control={control} name='nomeFantasia' fullWidth placeholder='Nome' />
      </Grid>

      <Grid item xs={12}>
        <RHFTextField control={control} name='razaoSocial' fullWidth placeholder='Razão social' />
      </Grid>

      <Grid item xs={12}>
        <RHFTextField control={control} name='cnpj' fullWidth placeholder='CNPJ' />
      </Grid>

      <Grid item xs={12}>
        <RHFTextField control={control} name='fone' fullWidth placeholder='Telefone' />
      </Grid>
    </Grid>
  )
}
