import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'

export function VincularMaterialDialog({
  isOpen,
  children,
  onClose
}: {
  children?: React.ReactNode
  isOpen: boolean
  onClose: () => void
}) {
  const handleClose = (): void => {
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Vincular Material/Insumo</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}
