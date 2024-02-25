import { categoriaQueries } from '@/queries/CategoriaQueries'
import { useIsOpenDialog } from '@/store/dialogStore'
import { TMaterial } from '@/types/models'
import { AddBoxSharp } from '@mui/icons-material'
import { Grid, IconButton, Tooltip } from '@mui/material'
import { Control } from 'react-hook-form'
import { RHFAutocompleteField } from '../shared/components/RHFwithMUI/RHFAutocompleteField'
import { RHFCheckbox } from '../shared/components/RHFwithMUI/RHFCheckbox'
import { RHFTextField } from '../shared/components/RHFwithMUI/RHFTextField'
import { VinculoComFornecedorasArrayField } from './VinculoComFornecedorasArrayField'

export const MaterialFormGrid = ({ control }: { control: Control<TMaterial> }) => {
  console.log('renderizou MaterialFormGrid')

  const { isOpen, toggleCategoriaDialog } = useIsOpenDialog()

  return (
    <Grid container rowGap={2} columnSpacing={1} marginBottom={2} alignItems='flex-end'>
      <Grid item xs={10} lg={isOpen.materialDialog ? 12 : 6}>
        <RHFTextField control={control} name='descricao' fullWidth placeholder='Descriçao' />
      </Grid>

      <Grid item xs={10} lg={isOpen.materialDialog ? 12 : 6}>
        <RHFTextField control={control} name='valorUntMed' placeholder='Valor unitário' />
        <RHFCheckbox control={control} name={'valorUntMedAuto'} />
      </Grid>

      <Grid item xs={10} lg={isOpen.materialDialog ? 12 : 6} textAlign='end'>
        <Tooltip title='Nova Categoria'>
          <IconButton color='primary' size='small' onClick={() => toggleCategoriaDialog(true)}>
            <AddBoxSharp />
          </IconButton>
        </Tooltip>
        <RHFAutocompleteField control={control} name='idCategoria' queries={categoriaQueries} placeholder='Categoria' />
      </Grid>

      <VinculoComFornecedorasArrayField control={control} />
    </Grid>
  )
}
