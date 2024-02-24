'use client'
import { Environment } from '@/environment'
import { requisicaoDeEstoqueQueries } from '@/queries/RequisicaoDeEstoqueQueries'
import { RequisicaoDeEstoqueSchema } from '@/schemas'
import { TRequisicaoDeEstoque } from '@/types/models'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { CancelButton } from '../shared/components/crudTools/CancelButton'
import { SaveSubmitButton } from '../shared/components/crudTools/SaveSubmitButton'
import { RequisicaoDeEstoqueGrid } from './RequisicaoDeEstoqueGrid'

export const RequisicaoDeEstoqueForm = ({ data, id }: { data?: TRequisicaoDeEstoque; id?: string }) => {
  console.log('renderizou RequisicaoDeEstoqueForm')

  const { REQUISICOES_DE_ESTOQUE } = Environment

  const { handleSubmit, setValue, control } = useForm<TRequisicaoDeEstoque>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(RequisicaoDeEstoqueSchema)
  })

  useEffect(() => {
    if (!data) return
    setValue('dataRequisicao', new Date(data.dataRequisicao))
    setValue('idRequisitante', data.idRequisitante)
    setValue('idLocalDeAplicacao', data.idLocalDeAplicacao)
    setValue('ordemProducao', data.ordemProducao)
    setValue('itens', data.itens)
    setValue('obs', data.obs)
    setValue('valorTotal', data.valorTotal)
    setValue('id', data.id)
  }, [setValue, data])

  const router = useRouter()

  const { mutate: create } = requisicaoDeEstoqueQueries.create()

  const { mutate: update } = requisicaoDeEstoqueQueries.updateById(Number(id))

  const onSubmit = (data: TRequisicaoDeEstoque) => {
    console.log(data)
    if (!id) {
      create(data, {
        onSuccess: response => {
          router.push(`${REQUISICOES_DE_ESTOQUE.SHOW_PAGE.replace('id', String(response.id))}`)
        }
      })
    } else {
      update(
        { ...data, id: Number(id) },
        {
          onSuccess: response => {
            router.push(`${REQUISICOES_DE_ESTOQUE.SHOW_PAGE.replace('id', String(response.id))}`)
          }
        }
      )
    }
  }

  return (
    <Box component='form' autoComplete='off' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
      <RequisicaoDeEstoqueGrid control={control} />

      <Stack spacing={2} direction='row' justifyContent='end'>
        <SaveSubmitButton />
        <CancelButton isPreviousRoute />
      </Stack>
    </Box>
  )
}
