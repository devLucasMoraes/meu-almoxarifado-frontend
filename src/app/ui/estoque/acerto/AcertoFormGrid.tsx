import { materialQueries } from '@/queries/MaterialQueries'
import { TAcerto } from '@/types/models'
import { Grid } from '@mui/material'
import { Control } from 'react-hook-form'
import { RHFAutocompleteField } from '../../shared/components/RHFwithMUI/RHFAutocompleteField'
import { RHFTextField } from '../../shared/components/RHFwithMUI/RHFTextField'

export const AcertoFormGrid = ({ control }: { control: Control<TAcerto> }) => {
  return (
    <Grid container rowGap={2} columnSpacing={1} marginBottom={2}>
      <Grid item xs={12}>
        <RHFTextField control={control} name='justificativa' placeholder='justificativa' fullWidth />
      </Grid>

      <Grid item xs={12}>
        <RHFAutocompleteField control={control} name='idMaterial' placeholder='Material' queries={materialQueries} />
      </Grid>

      <Grid item xs={12}>
        <RHFTextField control={control} name='quantidade' placeholder='quantidade' fullWidth type='number' />
      </Grid>
    </Grid>
  )
}
