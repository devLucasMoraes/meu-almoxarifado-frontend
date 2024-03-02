'use client'
import { Environment } from '@/environment'
import { emprestimoAPagarQueries } from '@/queries/EmprestimoAPagarQueries'
import { EmprestimoSchema } from '@/schemas'
import { TEmprestimo } from '@/types/models'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { CancelButton } from '../shared/components/CrudTools/CancelButton'
import { SaveSubmitButton } from '../shared/components/CrudTools/SaveSubmitButton'
import { EmprestimoFormGrid } from './EmprestimoFormGrid'

export const EmprestimoForm = ({ data, id }: { data?: TEmprestimo; id?: string }) => {
  console.log('renderizou EmprestimoForm')

  const { EMPRESTIMO } = Environment

  const { handleSubmit, setValue, control } = useForm<TEmprestimo>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(EmprestimoSchema)
  })

  useEffect(() => {
    if (!data) return
    setValue('tipo', data.tipo)
    setValue('atribuirAoEstoqueFisico', data.atribuirAoEstoqueFisico)
    setValue('dataDeAbertura', new Date(data.dataDeAbertura))
    setValue('valorTotal', data.valorTotal)
    setValue('idFornecedora', data.idFornecedora)
    setValue('situacao', data.situacao)
    setValue('itensAReceber', data.itensAReceber)
    setValue('itensAPagar', data.itensAPagar)
    setValue('id', data.id)
  }, [data, setValue])

  const route = useRouter()

  const { mutate: create } = emprestimoAPagarQueries.create()

  const { mutate: update } = emprestimoAPagarQueries.updateById(Number(id))

  const onSubmit = (data: TEmprestimo) => {
    console.log(data)
    if (!id) {
      create(data, {
        onSuccess: response => {
          route.push(`${EMPRESTIMO.A_PAGAR.SHOW_PAGE.replace('id', String(response.id))}`)
        }
      })
    } else {
      update(
        { ...data, id: Number(id) },
        {
          onSuccess: response => {
            route.push(`${EMPRESTIMO.A_PAGAR.SHOW_PAGE.replace('id', String(response.id))}`)
          }
        }
      )
    }
  }

  return (
    <Box component='form' autoComplete='off' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
      <EmprestimoFormGrid control={control} />

      <Stack spacing={2} direction='row' justifyContent='end'>
        <SaveSubmitButton />
        <CancelButton isPreviousRoute />
      </Stack>
    </Box>
  )
}
