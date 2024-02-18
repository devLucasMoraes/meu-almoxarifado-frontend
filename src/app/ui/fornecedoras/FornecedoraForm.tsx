'use client'
import { Environment } from '@/environment'
import { FornecedoraQueries } from '@/queries/FornecedoraQueries'
import { FornecedoraSchema } from '@/schemas'
import { TFornecedora } from '@/types/models'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { CancelButton } from '../shared/components/crudTools/CancelButton'
import { SaveSubmitButton } from '../shared/components/crudTools/SaveSubmitButton'
import { FornecedoraFormGrid } from './FornecedoraFormGrid'

const fornecedoraQueries = new FornecedoraQueries()

export const FornecedoraForm = ({ data, id }: { data?: TFornecedora; id?: string }) => {
  console.log('renderizou FornecedoraForm')

  const { FORNECEDORAS } = Environment

  //const { isOpenNewFornecedoraDialog, setIsOpenNewFornecedoraDialog } = useDialogContext()

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
          router.push(`${FORNECEDORAS.SHOW_PAGE.replace('id', String(response.id))}`)
          //setIsOpenNewFornecedoraDialog(false)
          //!isOpenNewFornecedoraDialog && router(`${Environment.FORNECEDORAS.SHOW}${Number(response.id)}`)
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
        <CancelButton isPreviousRoute />
      </Stack>
    </Box>
  )
}
