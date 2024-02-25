'use client'
import { Environment } from '@/environment'
import { materialQueries } from '@/queries/MaterialQueries'
import { MaterialSchema } from '@/schemas'
import { useIsOpenDialog } from '@/store/dialogStore'
import { TMaterial } from '@/types/models'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { CategoriaForm } from '../categorias/CategoriaForm'
import { FornecedoraForm } from '../fornecedoras/FornecedoraForm'
import { CancelButton } from '../shared/components/crudTools/CancelButton'
import { SaveSubmitButton } from '../shared/components/crudTools/SaveSubmitButton'
import { CreateDialog } from '../shared/components/dialogs/CreateDialog'
import { MaterialFormGrid } from './MaterialFormGrid'

export const MaterialForm = ({ data, id }: { data?: TMaterial; id?: string }) => {
  console.log('renderizou MaterialForm id', id)

  const { MATERIAIS } = Environment

  const { isOpen, toggleCategoriaDialog, toggleMaterialDialog, toggleFornecedoraDialog } = useIsOpenDialog()

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
          !isOpen.materialDialog && router.push(`${MATERIAIS.SHOW_PAGE.replace('id', String(response.id))}`)
          toggleMaterialDialog(false)
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
      <CreateDialog isOpen={isOpen.categoriaDialog} title='Nova Categoria' onClose={() => toggleCategoriaDialog(false)}>
        <CategoriaForm />
      </CreateDialog>

      <CreateDialog
        isOpen={isOpen.fornecedoraDialog}
        title='Nova Fornecedora'
        onClose={() => toggleFornecedoraDialog(false)}
      >
        <FornecedoraForm />
      </CreateDialog>

      <Box component='form' autoComplete='off' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
        <MaterialFormGrid control={control} />

        <Stack spacing={2} direction='row' justifyContent='end'>
          <SaveSubmitButton />
          <CancelButton isPreviousRoute={!isOpen.materialDialog} handleCancel={() => toggleMaterialDialog(false)} />
        </Stack>
      </Box>
    </>
  )
}
