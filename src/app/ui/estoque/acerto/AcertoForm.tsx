'use client'
import { Environment } from '@/environment'
import { materialQueries } from '@/queries/MaterialQueries'
import { AcertoSchema } from '@/schemas'
import { TAcerto } from '@/types/models'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { CancelButton } from '../../shared/components/CrudTools/CancelButton'
import { SaveSubmitButton } from '../../shared/components/CrudTools/SaveSubmitButton'
import { AcertoFormGrid } from './AcertoFormGrid'

export const AcertoForm = ({ data, id }: { data?: TAcerto; id?: string }) => {
  console.log('renderizou CategoriaForm')

  const { CATEGORIAS } = Environment

  const { handleSubmit, control } = useForm<TAcerto>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(AcertoSchema)
  })

  const router = useRouter()

  const { mutate: create } = materialQueries.acertoEstoque()

  const onSubmit = (data: TAcerto) => {
    console.log(data)
    if (!id) {
      create(data, {
        onSuccess: response => {
          //router.push(`${CATEGORIAS.SHOW_PAGE.replace('id', response.id.toString())}`)
        }
      })
    }
  }

  return (
    <Box component='form' autoComplete='off' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
      <AcertoFormGrid control={control} />

      <Stack spacing={2} direction='row' justifyContent='end'>
        <SaveSubmitButton />
        <CancelButton />
      </Stack>
    </Box>
  )
}
