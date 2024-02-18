'use client'
import { Environment } from '@/environment'
import { MaterialQueries } from '@/queries/MaterialQueries'
import { MaterialSchema } from '@/schemas/schemas'
import { TMaterial } from '@/types/models'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { CancelButton } from '../shared/components/crudTools/CancelButton'
import { SaveSubmitButton } from '../shared/components/crudTools/SaveSubmitButton'
import { MaterialFormGrid } from './MaterialFormGrid'

const materialQueries = new MaterialQueries()

export const MaterialForm = ({ data, id }: { data?: TMaterial; id?: string }) => {
  console.log('renderizou MaterialForm id', id)

  const { MATERIAIS } = Environment

  /*   const {
      isOpenNewCategoriaDialog,
      setIsOpenNewCategoriaDialog,
      isOpenNewMaterialDialog,
      setIsOpenNewMaterialDialog
    } = useDialogContext(); */

  const { handleSubmit, setValue, control } = useForm<TMaterial>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(MaterialSchema)
  })

  useEffect(() => {
    if (!data) return
    setValue('descricao', data.descricao)
    setValue('valorUntMedAuto', data.valorUntMedAuto)
    setValue('valorUntMed', data.valorUntMed)
    setValue('idCategoria', data.idCategoria)
    setValue('fornecedorasVinculadas', data.fornecedorasVinculadas)
    setValue('id', data.id)
  }, [data, setValue])

  const router = useRouter()

  const { mutate: create } = materialQueries.create()

  const { mutate: update } = materialQueries.updateById(Number(id))

  const onSubmit = (data: TMaterial) => {
    if (!id) {
      console.log('create', data)
      create(data, {
        onSuccess: response => {
          router.push(`${MATERIAIS.SHOW_PAGE.replace('id', String(response.id))}`)
          //setIsOpenNewMaterialDialog(false);
          //!isOpenNewMaterialDialog && route(`${Environment.MATERIAIS.SHOW}${Number(response.id)}`);
        }
      })
    } else {
      console.log('update', data)
      update(
        { ...data, id: Number(id) },
        {
          onSuccess: response => {
            router.push(`${MATERIAIS.SHOW_PAGE.replace('id', String(response.id))}`)
          }
        }
      )
    }
  }

  return (
    <>
      {/*       <NewDialog<TCategoria>
        newDialogOpen={isOpenNewCategoriaDialog}
        title='Nova Categoria'
        FormComponent={CategoriaForm}
        onClose={() => setIsOpenNewCategoriaDialog(false)}
      /> */}

      <Box component='form' autoComplete='off' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
        <MaterialFormGrid control={control} />

        <Stack spacing={2} direction='row' justifyContent='end'>
          <SaveSubmitButton />
          <CancelButton isPreviousRoute={true} />
        </Stack>
      </Box>
    </>
  )
}
