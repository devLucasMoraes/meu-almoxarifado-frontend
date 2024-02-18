'use client'
import { Environment } from '@/environment'
import { CategoriaQueries } from '@/queries/CategoriaQueries'
import { CategoriaSchema } from '@/schemas'
import { TCategoria } from '@/types/models'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { CancelButton } from '../shared/components/crudTools/CancelButton'
import { SaveSubmitButton } from '../shared/components/crudTools/SaveSubmitButton'
import { CategoriaFormGrid } from './CategoriaFormGrid'

const categoriaQueries = new CategoriaQueries()

export const CategoriaForm = ({ data, id }: { data?: TCategoria; id?: string }) => {
  console.log('renderizou CategoriaForm')

  const { CATEGORIAS } = Environment

  //const { isOpenNewCategoriaDialog, setIsOpenNewCategoriaDialog } = useDialogContext();

  const { handleSubmit, setValue, watch, control } = useForm<TCategoria>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(CategoriaSchema)
  })

  const undEstoqueAtual = watch('undEstoque')

  useEffect(() => {
    if (!data) return
    setValue('nome', data.nome)
    setValue('estoqueMinimo', data.estoqueMinimo)
    setValue('undEstoque', data.undEstoque)
    setValue('conversoesDeConsumo', data.conversoesDeConsumo)
    setValue('id', data.id)
  }, [data, setValue])

  const router = useRouter()

  const { mutate: create } = categoriaQueries.create()

  const { mutate: update } = categoriaQueries.updateById(Number(id))

  const onSubmit = (data: TCategoria) => {
    console.log(data)
    if (!id) {
      create(data, {
        onSuccess: response => {
          //setIsOpenNewCategoriaDialog(false);
          //!isOpenNewCategoriaDialog && navigate(`${Environment.CATEGORIAS.SHOW}${Number(response.id)}`);
          router.push(`${CATEGORIAS.SHOW_PAGE.replace('id', response.id.toString())}`)
        }
      })
    } else {
      update(
        { ...data, id: Number(id) },
        {
          onSuccess: response => {
            router.push(`${CATEGORIAS.SHOW_PAGE.replace('id', response.id.toString())}`)
          }
        }
      )
    }
  }

  return (
    <Box component='form' autoComplete='off' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
      <CategoriaFormGrid control={control} undEstoqueAtual={undEstoqueAtual} />

      <Stack spacing={2} direction='row' justifyContent='end'>
        <SaveSubmitButton />
        <CancelButton isPreviousRoute={true} />
      </Stack>
    </Box>
  )
}
