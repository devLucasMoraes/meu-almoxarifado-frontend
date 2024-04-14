import { TCategoria } from '@/types/models'
import { Grid } from '@mui/material'
import { Control } from 'react-hook-form'
import { RHFTextField } from '../shared/components/RHFwithMUI/RHFTextField'
import { ConversoesDeConsumoArrayField } from './ConversoesDeConsumoArrayField'

export const CategoriaFormGrid = ({
  control,
  undEstoqueAtual
}: {
  control: Control<TCategoria>
  undEstoqueAtual: string
}) => {
  return (
    <Grid container rowGap={2} columnSpacing={1} marginBottom={2}>
      <Grid item xs={12}>
        <RHFTextField control={control} name='nome' placeholder='Nome' fullWidth />
      </Grid>

      <Grid item xs={12}>
        <RHFTextField
          control={control}
          name='undEstoque'
          placeholder='Unidade de estoque'
          fullWidth
          isSelected='unidade'
        />
      </Grid>

      <Grid item xs={12}>
        <RHFTextField
          control={control}
          name='estoqueMinimo'
          placeholder='Estoque minimo'
          fullWidth
          endAdornment={undEstoqueAtual}
          type='number'
        />
      </Grid>

      <ConversoesDeConsumoArrayField control={control} undEstoqueAtual={undEstoqueAtual} />
    </Grid>
  )
}
