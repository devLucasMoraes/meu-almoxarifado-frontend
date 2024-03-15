import { fornecedoraQueries } from '@/queries/FornecedoraQueries'
import { materialQueries } from '@/queries/MaterialQueries'
import { useIsOpenDialog } from '@/store/dialogStore'
import { TVinculoMaterialFornecedora } from '@/types/models'
import { Grid } from '@mui/material'
import { Control } from 'react-hook-form'
import { AddButton } from '../shared/components/CrudTools/AddButton'
import { RHFAutocompleteField } from '../shared/components/RHFwithMUI/RHFAutocompleteField'
import { RHFTextField } from '../shared/components/RHFwithMUI/RHFTextField'
import { ConversaoDeCompraArrayField } from './ConversaoDeCompraArrayField'

export const VinculoMaterialFornecedoraFormGrid = ({ control }: { control: Control<TVinculoMaterialFornecedora> }) => {
  console.log('renderizou MaterialFormGrid')

  const { isOpen, toggleFornecedoraDialog, toggleMaterialDialog } = useIsOpenDialog()

  return (
    <Grid container rowGap={2} columnSpacing={1} marginBottom={2} alignItems='flex-end'>
      <Grid item xs={10} textAlign='end'>
        <AddButton title='Nova Fornecedora' handleAdd={() => toggleFornecedoraDialog(true)} />
        <RHFAutocompleteField
          queries={fornecedoraQueries}
          control={control}
          name='idFornecedora'
          placeholder='Fornecedora'
        />
      </Grid>

      <Grid item xs={8}>
        <RHFTextField control={control} name='referenciaFornecedora' placeholder='Código Produto' />
      </Grid>

      <Grid item xs={10} textAlign='end'>
        <AddButton title='Novo Material/Insumo' handleAdd={() => toggleMaterialDialog(true)} />
        <RHFAutocompleteField queries={materialQueries} control={control} name='idMaterial' placeholder='Material' />
      </Grid>

      <ConversaoDeCompraArrayField control={control} />
    </Grid>
  )
}
