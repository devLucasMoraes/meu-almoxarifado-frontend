import { LocalDeAplicacaoQueries } from '@/queries/LocalDeAplicacaoQueries'
import { RequisitanteQueries } from '@/queries/RequisitanteQueries'
import { TRequisicaoDeEstoque } from '@/types/models'
import { Grid } from '@mui/material'
import { Control } from 'react-hook-form'
import { RHFAutocompleteField } from '../shared/components/RHFwithMUI/RHFAutocompleteField'
import { RHFDatePicker } from '../shared/components/RHFwithMUI/RHFDatePicker'
import { RHFTextField } from '../shared/components/RHFwithMUI/RHFTextField'
import { ItensRequisicaoDeEstoqueArrayField } from './ItensRequisicaoDeEstoqueArrayField'

const requisitanteQueries = new RequisitanteQueries()
const localDeAplicacaoQueries = new LocalDeAplicacaoQueries()

export const RequisicaoDeEstoqueGrid = ({ control }: { control: Control<TRequisicaoDeEstoque> }) => {
  return (
    <Grid container rowGap={2} columnSpacing={1} marginBottom={2}>
      <Grid item xs={12} lg={6}>
        <RHFTextField control={control} fullWidth placeholder='Ordem de produção' name='ordemProducao' />
      </Grid>

      <Grid item xs={12} lg={6} display='flex' justifyContent='end'>
        <RHFDatePicker placeholder='Requerido em' name='dataRequisicao' control={control} />
      </Grid>

      <Grid item xs={12} lg={2}>
        <RHFTextField
          type='number'
          control={control}
          fullWidth
          placeholder='valor total da requisição'
          name='valorTotal'
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <RHFAutocompleteField
          placeholder='Requisitante'
          name='idRequisitante'
          queries={requisitanteQueries}
          control={control}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <RHFAutocompleteField
          control={control}
          placeholder='Local de aplicação'
          name='idLocalDeAplicacao'
          queries={localDeAplicacaoQueries}
        />
      </Grid>

      <Grid item xs={12}>
        <RHFTextField fullWidth placeholder='Observações' name='obs' control={control} />
      </Grid>

      <ItensRequisicaoDeEstoqueArrayField control={control} />
    </Grid>
  )
}
