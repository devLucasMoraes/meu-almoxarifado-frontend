'use client'
import { Environment } from '@/environment'
import { requisitanteQueries } from '@/queries/RequisitanteQueries'
import { RequisitanteSchema } from '@/schemas'
import { useIsOpenDialog } from '@/store/dialogStore'
import { TRequisitante } from '@/types/models'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { CancelButton } from '../shared/components/CrudTools/CancelButton'
import { SaveSubmitButton } from '../shared/components/CrudTools/SaveSubmitButton'
import { RequisitanteFormGrid } from './RequisitanteFormGrid'

export const RequisitanteForm = ({ data, id }: { data?: TRequisitante; id?: string }) => {
  console.log('renderizou RequisitanteForm')

  const { REQUISITANTES } = Environment

  const { isOpen, toggleRequisitanteDialog } = useIsOpenDialog()

  const { handleSubmit, setValue, control } = useForm<TRequisitante>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(RequisitanteSchema)
  })

  useEffect(() => {
    if (!data) return
    setValue('nome', data.nome)
    setValue('fone', data.fone)
    setValue('id', data.id)
  }, [setValue, data])

  const router = useRouter()

  const { mutate: create } = requisitanteQueries.create()

  const { mutate: update } = requisitanteQueries.updateById(Number(id))

  const onSubmit = (data: TRequisitante) => {
    console.log(data)
    if (!id) {
      create(data, {
        onSuccess: response => {
          !isOpen.requisitanteDialog && router.push(`${REQUISITANTES.SHOW_PAGE.replace('id', String(response.id))}`)
          toggleRequisitanteDialog(false)
        }
      })
    } else {
      update(
        { ...data, id: Number(id) },
        {
          onSuccess: response => {
            router.push(`${REQUISITANTES.SHOW_PAGE.replace('id', String(response.id))}`)
          }
        }
      )
    }
  }

  return (
    <Box component='form' autoComplete='off' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
      <RequisitanteFormGrid control={control} />

      <Stack spacing={2} direction='row' justifyContent='end'>
        <SaveSubmitButton />
        <CancelButton
          isPreviousRoute={!isOpen.requisitanteDialog}
          handleCancel={() => toggleRequisitanteDialog(false)}
        />
      </Stack>
    </Box>
  )
}
