import { Environment } from '@/environment'
import { materialQueries } from '@/queries/MaterialQueries'
import { vinculoMaterialFornecedoraQueries } from '@/queries/VinculoMaterialFornecedoraQueries'
import { useDialogDataStore } from '@/store/dialogDataStore'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { CancelButton } from '../CrudTools/CancelButton'
import { DeleteButton } from '../CrudTools/DeleteButton'
import { UnderlineLink } from '../UnderlineLink'

export function DesvincularMaterialDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { MATERIAIS } = Environment

  const { vinculoMaterialFornecedoraDialogData } = useDialogDataStore()

  const { data: vinculo } = useQuery({
    ...vinculoMaterialFornecedoraQueries.dynamicGetOne(
      `?id_fornecedora=${vinculoMaterialFornecedoraDialogData?.idFornecedora ?? ''}&id_material=${vinculoMaterialFornecedoraDialogData?.idMaterial ?? ''}&referencia_fornecedora=${vinculoMaterialFornecedoraDialogData?.referenciaFornecedora ?? ''}`
    )
  })

  console.log('vinculoMaterialFornecedoraDialogData desvincular', vinculoMaterialFornecedoraDialogData)

  const { mutate: deleteById } = vinculoMaterialFornecedoraQueries.deleteById()

  const handleClose = (): void => {
    onClose()
  }

  function desvincular(): void {
    if (!vinculo?.idVinculo) return
    deleteById(vinculo.idVinculo, { onSuccess: () => handleClose() })
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Material/Insumo vinculado</DialogTitle>
      <DialogContent>
        {vinculoMaterialFornecedoraDialogData?.idMaterial && (
          <UnderlineLink
            id={vinculoMaterialFornecedoraDialogData.idMaterial}
            queries={materialQueries}
            nameProperty='descricao'
            linkPath={`${MATERIAIS.SHOW_PAGE.replace('id', String(vinculoMaterialFornecedoraDialogData.idMaterial))}`}
          />
        )}
      </DialogContent>
      <DialogActions>
        <DeleteButton handleDelete={() => desvincular()} name='Desvincular' />
        <CancelButton isPreviousRoute handleCancel={handleClose} />
      </DialogActions>
    </Dialog>
  )
}
