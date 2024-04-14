'use client'
import { Environment } from '@/environment'
import { vinculoMaterialFornecedoraQueries } from '@/queries/VinculoMaterialFornecedoraQueries'
import { VinculoMaterialFornecedoraSchema } from '@/schemas'
import { useIsOpenDialog } from '@/store/dialogStore'
import { TVinculoMaterialFornecedora } from '@/types/models'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FornecedoraForm } from '../fornecedoras/FornecedoraForm'
import { CancelButton } from '../shared/components/CrudTools/CancelButton'
import { SaveSubmitButton } from '../shared/components/CrudTools/SaveSubmitButton'
import { CreateDialog } from '../shared/components/dialogs/CreateDialog'
import { VinculoMaterialFornecedoraFormGrid } from './VinculoMaterialFornecedoraFormGrid'

export const VinculoMaterialFornecedoraForm = ({ data, id }: { data?: TVinculoMaterialFornecedora; id?: string }) => {
  console.log('renderizou VinculoMaterialFornecedoraForm')

  const { VINCULOS } = Environment

  const { isOpen, toggleVincularMaterialDialog, toggleFornecedoraDialog } = useIsOpenDialog()

  const { handleSubmit, setValue, control } = useForm<TVinculoMaterialFornecedora>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(VinculoMaterialFornecedoraSchema)
  })

  useEffect(() => {
    if (!data) return
    setValue('conversoesDeCompra', data.conversoesDeCompra)
    setValue('referenciaFornecedora', data.referenciaFornecedora)
    setValue('descricaoFornecedora', data.descricaoFornecedora)
    setValue('idFornecedora', data.idFornecedora)
    setValue('idMaterial', data.idMaterial)
    setValue('idVinculo', data.idVinculo)
  }, [data, setValue])

  const router = useRouter()

  const { mutate: create } = vinculoMaterialFornecedoraQueries.create()

  const { mutate: update } = vinculoMaterialFornecedoraQueries.updateById(Number(id))

  const onSubmit = (data: TVinculoMaterialFornecedora) => {
    if (!id) {
      console.log('create', data)
      create(data, {
        onSuccess: response => {
          !isOpen.vincularMaterialDialog &&
            router.push(`${VINCULOS.SHOW_PAGE.replace('id', String(response.idVinculo))}`)
          toggleVincularMaterialDialog(false)
        }
      })
    } else {
      console.log('update', data)
      update(
        { ...data, idVinculo: Number(id) },
        {
          onSuccess: response => {
            router.push(`${VINCULOS.SHOW_PAGE.replace('id', String(response.idVinculo))}`)
          }
        }
      )
    }
  }

  return (
    <>
      <CreateDialog
        isOpen={isOpen.fornecedoraDialog}
        title='Nova Fornecedora'
        onClose={() => toggleFornecedoraDialog(false)}
      >
        <FornecedoraForm />
      </CreateDialog>

      <Box component='form' autoComplete='off' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
        <VinculoMaterialFornecedoraFormGrid control={control} />

        <Stack spacing={2} direction='row' justifyContent='end'>
          <SaveSubmitButton />
          <CancelButton
            isPreviousRoute={!isOpen.vincularMaterialDialog}
            handleCancel={() => toggleVincularMaterialDialog(false)}
          />
        </Stack>
      </Box>
    </>
  )
}
