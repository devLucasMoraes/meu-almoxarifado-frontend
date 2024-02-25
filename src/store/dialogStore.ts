import { create } from 'zustand'

type DialogStore = {
  isOpen: {
    categoriaDialog: boolean
    materialDialog: boolean
    fornecedoraDialog: boolean
    transportadoraDialog: boolean
    requisitanteDialog: boolean
    localDeAplicacaoDialog: boolean
  }
  toggleCategoriaDialog: (isOpen: boolean) => void
  toggleMaterialDialog: (isOpen: boolean) => void
  toggleFornecedoraDialog: (isOpen: boolean) => void
  toggleTransportadoraDialog: (isOpen: boolean) => void
  toggleRequisitanteDialog: (isOpen: boolean) => void
  toggleLocalDeAplicacaoDialog: (isOpen: boolean) => void
}

export const useIsOpenDialog = create<DialogStore>()(set => ({
  isOpen: {
    categoriaDialog: false,
    materialDialog: false,
    fornecedoraDialog: false,
    transportadoraDialog: false,
    requisitanteDialog: false,
    localDeAplicacaoDialog: false
  },
  toggleRequisitanteDialog: (isOpen: boolean) =>
    set(state => ({
      isOpen: { ...state.isOpen, requisitanteDialog: isOpen }
    })),
  toggleLocalDeAplicacaoDialog: (isOpen: boolean) =>
    set(state => ({
      isOpen: { ...state.isOpen, localDeAplicacaoDialog: isOpen }
    })),
  toggleFornecedoraDialog: (isOpen: boolean) =>
    set(state => ({
      isOpen: { ...state.isOpen, fornecedoraDialog: isOpen }
    })),
  toggleTransportadoraDialog: (isOpen: boolean) =>
    set(state => ({
      isOpen: { ...state.isOpen, transportadoraDialog: isOpen }
    })),
  toggleCategoriaDialog: (isOpen: boolean) =>
    set(state => ({
      isOpen: { ...state.isOpen, categoriaDialog: isOpen }
    })),
  toggleMaterialDialog: (isOpen: boolean) =>
    set(state => ({
      isOpen: { ...state.isOpen, materialDialog: isOpen }
    }))
}))
