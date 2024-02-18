'use client'
import { Environment } from '@/environment'
import { TransportadoraQueries } from '@/queries/TransportadoraQueries'
import { TransportadoraSchema } from '@/schemas'
import { TTransportadora } from '@/types/models'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { CancelButton } from '../shared/components/crudTools/CancelButton'
import { SaveSubmitButton } from '../shared/components/crudTools/SaveSubmitButton'
import { TransportadoraFormGrid } from './TransportadoraFormGrid'

const transportadoraQueries = new TransportadoraQueries()

export const TransportadoraForm = ({ data, id }: { data?: TTransportadora; id?: string }) => {
  console.log('renderizou TransportadoraForm')

  //const { isOpenNewTransportadoraDialog, setIsOpenNewTransportadoraDialog } = useDialogContext()

  const { TRANSPORTADORAS } = Environment

  const { handleSubmit, setValue, control } = useForm<TTransportadora>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(TransportadoraSchema)
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

  const { mutate: create } = transportadoraQueries.create()

  const { mutate: update } = transportadoraQueries.updateById(Number(id))

  const onSubmit = (data: TTransportadora) => {
    console.log(data)
    if (!id) {
      create(data, {
        onSuccess: response => {
          //setIsOpenNewTransportadoraDialog(false)
          //!isOpenNewTransportadoraDialog && router(`${TRANSPORTADORAS.SHOW}${Number(response.id)}`)
          router.push(`${TRANSPORTADORAS.SHOW_PAGE.replace('id', String(response.id))}`)
        }
      })
    } else {
      update(
        { ...data, id: Number(id) },
        {
          onSuccess: response => {
            router.push(`${TRANSPORTADORAS.SHOW_PAGE.replace('id', String(response.id))}`)
          }
        }
      )
    }
  }

  return (
    <Box component='form' autoComplete='off' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
      <TransportadoraFormGrid control={control} />

      <Stack spacing={2} direction='row' justifyContent='end'>
        <SaveSubmitButton />
        <CancelButton isPreviousRoute />
      </Stack>
    </Box>
  )
}
