import { localDeAplicacaoQueries } from '@/queries/LocalDeAplicacaoQueries'
import { requisitanteQueries } from '@/queries/RequisitanteQueries'
import { useIsOpenDialog } from '@/store/dialogStore'
import { TRequisicaoDeEstoque } from '@/types/models'
import { AddBoxSharp } from '@mui/icons-material'
import { Grid, IconButton, Tooltip } from '@mui/material'
import { Control } from 'react-hook-form'
import { RHFAutocompleteField } from '../shared/components/RHFwithMUI/RHFAutocompleteField'
import { RHFDatePicker } from '../shared/components/RHFwithMUI/RHFDatePicker'
import { RHFTextField } from '../shared/components/RHFwithMUI/RHFTextField'
import { ItensRequisicaoDeEstoqueArrayField } from './ItensRequisicaoDeEstoqueArrayField'

export const RequisicaoDeEstoqueGrid = ({ control }: { control: Control<TRequisicaoDeEstoque> }) => {
  console.log('renderizou RequisicaoDeEstoqueGrid')

  const { toggleRequisitanteDialog, toggleLocalDeAplicacaoDialog } = useIsOpenDialog()

  return (
    <Grid container rowGap={2} columnSpacing={1} marginBottom={2} alignItems='flex-end'>
      <Grid item xs={12} lg={4}>
        <RHFDatePicker placeholder='Requerido em' name='dataRequisicao' control={control} fullWidth />
      </Grid>

      <Grid item xs={12} lg={4}>
        <RHFTextField
          type='number'
          control={control}
          fullWidth
          placeholder='valor total da requisição'
          name='valorTotal'
        />
      </Grid>

      <Grid item xs={12} lg={4}>
        <RHFTextField control={control} fullWidth placeholder='Ordem de produção' name='ordemProducao' />
      </Grid>

      <Grid item xs={12} lg={3} textAlign='end'>
        <Tooltip title='Novo Requisitante'>
          <IconButton color='primary' size='small' onClick={() => toggleRequisitanteDialog(true)}>
            <AddBoxSharp />
          </IconButton>
        </Tooltip>
        <RHFAutocompleteField
          placeholder='Requisitante'
          name='idRequisitante'
          queries={requisitanteQueries}
          control={control}
        />
      </Grid>

      <Grid item xs={12} lg={3} textAlign='end'>
        <Tooltip title='Novo Local de aplicação'>
          <IconButton color='primary' size='small' onClick={() => toggleLocalDeAplicacaoDialog(true)}>
            <AddBoxSharp />
          </IconButton>
        </Tooltip>
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
