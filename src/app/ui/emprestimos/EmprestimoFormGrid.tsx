import { fornecedoraQueries } from '@/queries/FornecedoraQueries'
import { TEmprestimo } from '@/types/models'
import { Grid, Typography } from '@mui/material'
import { Control } from 'react-hook-form'
import { RHFAutocompleteField } from '../shared/components/RHFwithMUI/RHFAutocompleteField'
import { RHFCheckbox } from '../shared/components/RHFwithMUI/RHFCheckbox'
import { RHFDatePicker } from '../shared/components/RHFwithMUI/RHFDatePicker'
import { RHFTextField } from '../shared/components/RHFwithMUI/RHFTextField'
import { ItensEmprestimoArrayField } from './ItensEmprestimoArrayField'

export const EmprestimoFormGrid = ({ control }: { control: Control<TEmprestimo> }) => {
  return (
    <Grid container rowGap={2} columnSpacing={1} marginBottom={2} justifyContent='space-between'>
      <Grid item xs={12} lg={4}>
        <RHFAutocompleteField
          control={control}
          name='idFornecedora'
          placeholder='fornecedora'
          queries={fornecedoraQueries}
        />
      </Grid>

      <Grid item xs={12} lg={4}>
        <RHFDatePicker control={control} name='dataDeAbertura' placeholder='data abertura' fullWidth />
      </Grid>

      <Grid item xs={12} lg={4}>
        <RHFTextField control={control} name='tipo' placeholder='tipo' fullWidth isSelected='tipo' />
      </Grid>

      <Grid item xs={12} lg={3}>
        <RHFTextField control={control} name='valorTotal' placeholder='Valor total' type='number' fullWidth />
      </Grid>

      <Grid item xs={12} lg={3} display='flex' justifyContent='flex-end' alignItems='center'>
        <RHFCheckbox control={control} name='atribuirAoEstoqueFisico' fullWidth />
        <Typography noWrap variant='subtitle1'>
          Atribuir Ao Estoque Fisico
        </Typography>
      </Grid>

      <Grid item xs={12} lg={4}>
        <RHFTextField control={control} name='situacao' placeholder='situacao' fullWidth isSelected='situacao' />
      </Grid>

      <ItensEmprestimoArrayField control={control} />
    </Grid>
  )
}
