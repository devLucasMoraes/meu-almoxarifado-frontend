import { fornecedoraQueries } from '@/queries/FornecedoraQueries'
import { transportadoraQueries } from '@/queries/TransportadoraQueries'
import { useIsOpenDialog } from '@/store/dialogStore'
import { TNfeDeCompra } from '@/types/models'
import { AddBoxSharp } from '@mui/icons-material'
import { Grid, IconButton, Tooltip } from '@mui/material'
import { Control } from 'react-hook-form'
import { RHFAutocompleteField } from '../../shared/components/RHFwithMUI/RHFAutocompleteField'
import { RHFDatePicker } from '../../shared/components/RHFwithMUI/RHFDatePicker'
import { RHFTextField } from '../../shared/components/RHFwithMUI/RHFTextField'
import { ItensNfeDeCompraArrayField } from './ItensNfeDeCompraArrayField'

export const NfeDeCompraGrid = ({ control, data }: { control: Control<TNfeDeCompra>; data?: TNfeDeCompra }) => {
  console.log('renderizou NfeDeCompraGrid')

  //const { data: fornecedora } = useFornecedoraGetById(data?.idFornecedora)

  //const { data: transportadora } = useTransportadoraGetById(data?.idTransportadora)

  const { isOpen, toggleFornecedoraDialog, toggleTransportadoraDialog } = useIsOpenDialog()

  return (
    <Grid container rowGap={2} marginBottom={2} columnSpacing={1} alignItems='flex-end'>
      <Grid item xs={12} lg={3}>
        <RHFTextField control={control} name='nfe' placeholder='NFe' />
      </Grid>

      <Grid item xs={12} lg={3}>
        <RHFDatePicker control={control} name='dataEmissao' placeholder='Emitido em' />
      </Grid>

      <Grid item xs={12} lg={6}>
        <RHFTextField control={control} name='chaveNfe' placeholder='Chave NFe' fullWidth />
      </Grid>

      <Grid item xs={12} lg={2}>
        <RHFTextField control={control} name='valorSeguro' placeholder='Valor seguro' type='number' fullWidth />
      </Grid>

      <Grid item xs={12} lg={2}>
        <RHFTextField control={control} name='valorDesconto' placeholder='Valor desconto' type='number' fullWidth />
      </Grid>

      <Grid item xs={12} lg={2}>
        <RHFTextField control={control} name='valorOutros' placeholder='Outros valores' type='number' fullWidth />
      </Grid>

      <Grid item xs={12} lg={2}>
        <RHFTextField control={control} name='valorTotalIpi' placeholder='Valor total IPI' type='number' fullWidth />
      </Grid>

      <Grid item xs={12} lg={2}>
        <RHFTextField
          control={control}
          name='valorTotalProdutos'
          placeholder='valor total produtos'
          type='number'
          fullWidth
        />
      </Grid>

      <Grid item xs={12} lg={2}>
        <RHFTextField
          control={control}
          name='valorTotalNfe'
          placeholder='Valor total da nota'
          type='number'
          fullWidth
        />
      </Grid>

      <Grid item xs={12} lg={3} textAlign='end'>
        <Tooltip title='Nova Fornecedora'>
          <IconButton color='primary' size='small' onClick={() => toggleFornecedoraDialog(true)}>
            <AddBoxSharp />
          </IconButton>
        </Tooltip>
        <RHFAutocompleteField
          control={control}
          name='idFornecedora'
          placeholder='Fornecedora'
          queries={fornecedoraQueries}
        />
      </Grid>

      <Grid item xs={12} lg={2}>
        <RHFTextField control={control} name='valorFrete' placeholder='Valor do frete' type='number' fullWidth />
      </Grid>

      <Grid item xs={12} lg={3} textAlign='end'>
        <Tooltip title='Nova Transportadora'>
          <IconButton color='primary' size='small' onClick={() => toggleTransportadoraDialog(true)}>
            <AddBoxSharp />
          </IconButton>
        </Tooltip>
        <RHFAutocompleteField
          control={control}
          name='idTransportadora'
          placeholder='Transportadora'
          queries={transportadoraQueries}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <RHFDatePicker control={control} name='dataRecebimento' placeholder='Recebido em' />
      </Grid>

      <Grid item xs={12}>
        <RHFTextField control={control} name='obs' placeholder='Observações' fullWidth />
      </Grid>

      <ItensNfeDeCompraArrayField control={control} />
    </Grid>
  )
}
