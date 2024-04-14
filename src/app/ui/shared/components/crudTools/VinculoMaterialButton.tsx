import { materialQueries } from '@/queries/MaterialQueries'
import { useDialogDataStore } from '@/store/dialogDataStore'
import { useIsOpenDialog } from '@/store/dialogStore'
import { TNfeDeCompra, TVinculoMaterialFornecedora } from '@/types/models'
import { Button, LinearProgress, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { FieldArrayWithId } from 'react-hook-form'

export function VinculoMaterialButton({ row }: { row: FieldArrayWithId<TNfeDeCompra, 'itens', 'id'> }) {
  const { data, isLoading } = useQuery({ ...materialQueries.getById(row.idMaterial) })

  const { toggleVincularMaterialDialog, toggleDesvincularMaterialDialog } = useIsOpenDialog()
  const { setVinculoMaterialFornecedoraDialogData, setMaterialDialogData } = useDialogDataStore()

  function handleClickVincularMaterial() {
    setVinculoMaterialFornecedoraDialogData(
      old =>
        ({
          ...old,
          referenciaFornecedora: row.referenciaFornecedora,
          descricaoFornecedora: row.descricaoFornecedora
        }) as TVinculoMaterialFornecedora
    )
    toggleVincularMaterialDialog(true)
  }

  function handleClickDesvincularMaterial() {
    setVinculoMaterialFornecedoraDialogData(
      old =>
        ({
          ...old,
          referenciaFornecedora: row.referenciaFornecedora,
          descricaoFornecedora: row.descricaoFornecedora,
          idMaterial: row.idMaterial
        }) as TVinculoMaterialFornecedora
    )
    toggleDesvincularMaterialDialog(true)
  }

  return (
    <>
      {isLoading ? (
        <LinearProgress sx={{ overflow: 'hidden', width: '90%' }} />
      ) : data ? (
        <Button onClick={handleClickDesvincularMaterial}>
          <Typography noWrap>{data.descricao}</Typography>
        </Button>
      ) : (
        <Button color='error' onClick={handleClickVincularMaterial}>
          <Typography noWrap>Vincular Material</Typography>
        </Button>
      )}
    </>
  )
}
