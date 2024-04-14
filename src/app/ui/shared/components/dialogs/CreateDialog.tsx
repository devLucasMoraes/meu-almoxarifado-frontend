import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'

export const CreateDialog = ({
  isOpen,
  title,
  children,
  onClose
}: {
  title: string
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}) => {
  console.log(`renderizou ${title}Dialog`)

  const handleClose = (): void => {
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}
