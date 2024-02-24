import { categoriaQueries } from '@/queries/CategoriaQueries'
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

  /*   const {
      setIsOpenNewCategoriaDialog,
      isOpenNewMaterialDialog,
    } = useDialogContext(); */

  return (
    <Grid container rowGap={2} columnSpacing={1} marginBottom={2}>
      <Grid item xs={10} lg={6}>
        <RHFTextField control={control} name='descricao' fullWidth placeholder='Descriçao' />
      </Grid>

      <Grid item xs={10} lg={6}>
        <RHFTextField control={control} name='valorUntMed' placeholder='Valor unitário' />
        <RHFCheckbox control={control} name={'valorUntMedAuto'} />
      </Grid>

      <Grid item xs={10} lg={6} display='flex'>
        <RHFAutocompleteField control={control} name='idCategoria' queries={categoriaQueries} placeholder='Categoria' />
        <Tooltip title='Nova Categoria'>
          <IconButton color='primary' size='small'>
            <AddBoxSharp />
          </IconButton>
        </Tooltip>
      </Grid>

      <VinculoComFornecedorasArrayField control={control} />
    </Grid>
  )
}
