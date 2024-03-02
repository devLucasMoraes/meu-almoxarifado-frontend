'use client'
import { Environment } from '@/environment'
import { fornecedoraQueries } from '@/queries/FornecedoraQueries'
import { FornecedoraSchema } from '@/schemas'
import { useIsOpenDialog } from '@/store/dialogStore'
import { TFornecedora } from '@/types/models'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { CancelButton } from '../shared/components/CrudTools/CancelButton'
import { SaveSubmitButton } from '../shared/components/CrudTools/SaveSubmitButton'
import { FornecedoraFormGrid } from './FornecedoraFormGrid'

export const FornecedoraForm = ({ data, id }: { data?: TFornecedora; id?: string }) => {
  console.log('renderizou FornecedoraForm')

  const { FORNECEDORAS } = Environment

  const { isOpen, toggleFornecedoraDialog } = useIsOpenDialog()

  const { handleSubmit, setValue, control } = useForm<TFornecedora>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(FornecedoraSchema)
  })

  useEffect(() => {
    if (!data) return
    setValue('nomeFantasia', data.nomeFantasia)
    setValue('razaoSocial', data.razaoSocial)
    setValue('cnpj', data.cnpj)
    setValue('fone', data.fone)
    setValue('id', data.id)
  }, [data, setValue])

  const router = useRouter()

  const { mutate: create } = fornecedoraQueries.create()

  const { mutate: update } = fornecedoraQueries.updateById(Number(id))

  const onSubmit = (data: TFornecedora) => {
    console.log(data)
    if (!id) {
      create(data, {
        onSuccess: response => {
          !isOpen.fornecedoraDialog && router.push(`${FORNECEDORAS.SHOW_PAGE.replace('id', String(response.id))}`)
          toggleFornecedoraDialog(false)
        }
      })
    } else {
      update(
        { ...data, id: Number(id) },
        {
          onSuccess: response => {
            router.push(`${FORNECEDORAS.SHOW_PAGE.replace('id', String(response.id))}`)
          }
        }
      )
    }
  }

  return (
    <Box component='form' autoComplete='off' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
      <FornecedoraFormGrid control={control} />

      <Stack spacing={2} direction='row' justifyContent='end'>
        <SaveSubmitButton />
        <CancelButton isPreviousRoute={!isOpen.fornecedoraDialog} handleCancel={() => toggleFornecedoraDialog(false)} />
      </Stack>
    </Box>
  )
}
