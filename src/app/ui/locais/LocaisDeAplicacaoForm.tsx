'use client'
import { Environment } from '@/environment'
import { LocalDeAplicacaoQueries } from '@/queries/LocalDeAplicacaoQueries'
import { LocalDeAplicacaoSchema } from '@/schemas'
import { TLocalDeAplicacao } from '@/types/models'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { CancelButton } from '../shared/components/crudTools/CancelButton'
import { SaveSubmitButton } from '../shared/components/crudTools/SaveSubmitButton'
import { LocaisDeAplicacaoFormGrid } from './LocaisDeAplicacaoFormGrid'

const localDeAplicacaoQueries = new LocalDeAplicacaoQueries()

export const LocaisDeAplicacaoForm = ({ data, id }: { data?: TLocalDeAplicacao; id?: string }) => {
  console.log('renderizou LocaisDeAplicacaoForm')

  const { LOCAIS_DE_APLICACAO } = Environment

  const { handleSubmit, setValue, control } = useForm<TLocalDeAplicacao>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(LocalDeAplicacaoSchema)
  })

  useEffect(() => {
    if (!data) return
    setValue('nome', data.nome)
    setValue('id', data.id)
  }, [setValue, data])

  const router = useRouter()

  const { mutate: create } = localDeAplicacaoQueries.create()

  const { mutate: update } = localDeAplicacaoQueries.updateById(Number(id))

  const onSubmit = (data: TLocalDeAplicacao) => {
    console.log(data)
    if (!id) {
      create(data, {
        onSuccess: response => {
          router.push(`${LOCAIS_DE_APLICACAO.SHOW_PAGE.replace('id', String(response.id))}`)
          //setIsOpenNewFornecedoraDialog(false)
          //!isOpenNewFornecedoraDialog && router(`${Environment.FORNECEDORAS.SHOW}${Number(response.id)}`)
        }
      })
    } else {
      update(
        { ...data, id: Number(id) },
        {
          onSuccess: response => {
            router.push(`${LOCAIS_DE_APLICACAO.SHOW_PAGE.replace('id', String(response.id))}`)
            //setIsOpenNewFornecedoraDialog(false)
            //!isOpenNewFornecedoraDialog && router(`${Environment.FORNECEDORAS.SHOW}${Number(response.id)}`)
          }
        }
      )
    }
  }

  return (
    <Box component='form' autoComplete='off' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
      <LocaisDeAplicacaoFormGrid control={control} />

      <Stack spacing={2} direction='row' justifyContent='end'>
        <SaveSubmitButton />
        <CancelButton isPreviousRoute />
      </Stack>
    </Box>
  )
}
