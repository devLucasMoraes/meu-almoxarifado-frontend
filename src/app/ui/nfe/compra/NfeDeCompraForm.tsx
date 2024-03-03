'use client'
import { Environment } from '@/environment'
import { nfeDeCompraQueries } from '@/queries/NfeDeCompraQueries'
import { NfeDeCompraSchema } from '@/schemas'
import { useDialogDataStore } from '@/store/dialogDataStore'
import { useIsOpenDialog } from '@/store/dialogStore'
import { TNfeDeCompra } from '@/types/models'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FornecedoraForm } from '../../fornecedoras/FornecedoraForm'
import { MaterialForm } from '../../materiais/MaterialForm'
import { CancelButton } from '../../shared/components/CrudTools/CancelButton'
import { SaveSubmitButton } from '../../shared/components/CrudTools/SaveSubmitButton'
import { CreateDialog } from '../../shared/components/dialogs/CreateDialog'
import { TransportadoraForm } from '../../transportadoras/TransportadoraForm'
import { NfeDeCompraGrid } from './NfeDeCompraGrid'

export const NfeDeCompraForm = ({ data, id }: { data?: TNfeDeCompra; id?: string }) => {
  console.log('renderizou TNfeDeCompra')

  const { NFE_DE_COMPRA } = Environment

  const { isOpen, toggleFornecedoraDialog, toggleMaterialDialog, toggleTransportadoraDialog } = useIsOpenDialog()

  const { fornecedoraDialogData, transportadoraDialogData, setTransportadoraDialogData, setFornecedoraDialogData } =
    useDialogDataStore()

  const { handleSubmit, setValue, control, getValues, clearErrors, reset } = useForm<TNfeDeCompra>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(NfeDeCompraSchema)
  })

  const value = getValues()
  console.log('getvalues ----->', value)
  console.log('fornecedoraDialogData ----->', fornecedoraDialogData)
  console.log('transportadoraDialogData ----->', transportadoraDialogData)

  useEffect(() => {
    console.log('useeffect data', data)
    clearErrors()
    if (data) return
    setTransportadoraDialogData(undefined)
    setFornecedoraDialogData(undefined)
    reset()
  }, [clearErrors, data, reset, setFornecedoraDialogData, setTransportadoraDialogData])

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

  useEffect(() => {
    console.log('useefect transportadoraDialogData', transportadoraDialogData)
    if (!data) return
    if (!transportadoraDialogData?.id) return
    setValue('idTransportadora', transportadoraDialogData.id)
  }, [data, setValue, transportadoraDialogData])

  useEffect(() => {
    console.log('useefect fornecedoraDialogData', fornecedoraDialogData)
    if (!data) return
    if (!fornecedoraDialogData?.id) return
    setValue('idFornecedora', fornecedoraDialogData.id)
  }, [data, setValue, fornecedoraDialogData])

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
      <CreateDialog
        isOpen={isOpen.fornecedoraDialog}
        title='Nova Fornecedora'
        onClose={() => toggleFornecedoraDialog(false)}
      >
        <FornecedoraForm data={fornecedoraDialogData} />
      </CreateDialog>

      <CreateDialog
        isOpen={isOpen.transportadoraDialog}
        title='Nova Transportadora'
        onClose={() => toggleTransportadoraDialog(false)}
      >
        <TransportadoraForm data={transportadoraDialogData} />
      </CreateDialog>

      <CreateDialog
        isOpen={isOpen.materialDialog}
        title='Novo Material/Insummo'
        onClose={() => toggleMaterialDialog(false)}
      >
        <MaterialForm />
      </CreateDialog>

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
