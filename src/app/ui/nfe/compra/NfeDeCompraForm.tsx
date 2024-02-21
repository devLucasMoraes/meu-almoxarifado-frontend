'use client'
import { Environment } from '@/environment'
import { NfeDeCompraQueries } from '@/queries/NfeDeCompraQueries'
import { NfeDeCompraSchema } from '@/schemas'
import { TNfeDeCompra } from '@/types/models'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { CancelButton } from '../../shared/components/crudTools/CancelButton'
import { SaveSubmitButton } from '../../shared/components/crudTools/SaveSubmitButton'
import { NfeDeCompraGrid } from './NfeDeCompraGrid'

const nfeDeCompraQueries = new NfeDeCompraQueries()

export const NfeDeCompraForm = ({ data, id }: { data?: TNfeDeCompra; id?: string }) => {
  console.log('renderizou TNfeDeCompra')

  const { NFE_DE_COMPRA } = Environment

  /*   const {
    isOpenNewMaterialDialog,
    setIsOpenNewMaterialDialog,
    newMaterialDialogContent,
    isOpenNewFornecedoraDialog,
    setIsOpenNewFornecedoraDialog,
    isOpenNewTransportadoraDialog,
    setIsOpenNewTransportadoraDialog
  } = useDialogContext() */

  //const { fornecedoraXMLFile, transportadoraXMLFile } = useFileHandleContext()

  const { handleSubmit, setValue, control, getValues, clearErrors, reset } = useForm<TNfeDeCompra>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(NfeDeCompraSchema)
  })

  const value = getValues()
  console.log('getvalues ----->', value)

  useEffect(() => {
    console.log('useeffect data', data)
    clearErrors()
    if (data) return
    reset()
  }, [clearErrors, data, reset])

  useEffect(() => {
    if (!data) return
    console.log('NfeDeCompraForm useEffect', data)
    setValue('id', data.id)
    setValue('nfe', data.nfe)
    setValue('chaveNfe', data.chaveNfe)
    setValue('dataEmissao', new Date(data.dataEmissao))
    setValue('dataRecebimento', new Date(data.dataRecebimento))
    setValue('valorFrete', data.valorFrete)
    setValue('valorSeguro', data.valorSeguro)
    setValue('valorDesconto', data.valorDesconto)
    setValue('valorOutros', data.valorOutros)
    setValue('valorTotalIpi', data.valorTotalIpi)
    setValue('valorTotalProdutos', data.valorTotalProdutos)
    setValue('valorTotalNfe', data.valorTotalNfe)
    setValue('obs', data.obs)
    setValue('idTransportadora', data.idTransportadora)
    setValue('idFornecedora', data.idFornecedora)
    setValue('itens', data.itens)
  }, [data, setValue])

  const router = useRouter()

  const { mutate: create } = nfeDeCompraQueries.create()

  const { mutate: update } = nfeDeCompraQueries.updateById(Number(id))

  const onSubmit = (data: TNfeDeCompra) => {
    console.log(data)
    if (!id) {
      create(data, {
        onSuccess: response => {
          router.push(`${NFE_DE_COMPRA.SHOW_PAGE.replace('id', String(response.id))}`)
        }
      })
    } else {
      update(
        { ...data, id: Number(id) },
        {
          onSuccess: response => {
            router.push(`${NFE_DE_COMPRA.SHOW_PAGE.replace('id', String(response.id))}`)
          }
        }
      )
    }
  }

  return (
    <>
      {/*      <NewDialog<TFornecedoraSchema>
        newDialogOpen={isOpenNewFornecedoraDialog}
        title='Nova Fornecedora'
        FormComponent={FornecedoraForm}
        data={fornecedoraXMLFile}
        onClose={() => setIsOpenNewFornecedoraDialog(false)}
      />
      <NewDialog<TTransportadoraSchema>
        newDialogOpen={isOpenNewTransportadoraDialog}
        title='Nova Transportadora'
        FormComponent={TransportadoraForm}
        data={transportadoraXMLFile}
        onClose={() => setIsOpenNewTransportadoraDialog(false)}
      />
      <NewDialog<TMaterial>
        newDialogOpen={isOpenNewMaterialDialog}
        title='Novo Material/Insummo'
        FormComponent={MaterialForm}
        data={newMaterialDialogContent}
        onClose={() => setIsOpenNewMaterialDialog(false)}
      /> */}
      <Box component='form' autoComplete='off' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
        <NfeDeCompraGrid control={control} />

        <Stack spacing={2} direction='row' justifyContent='end'>
          <SaveSubmitButton />
          <CancelButton isPreviousRoute />
        </Stack>
      </Box>
    </>
  )
}
