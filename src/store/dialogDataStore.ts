import {
  TCategoria,
  TFornecedora,
  TLocalDeAplicacao,
  TMaterial,
  TRequisitante,
  TTransportadora,
  TVinculoMaterialFornecedora
} from '@/types/models'
import { create } from 'zustand'

type dialogDataStore = {
  categoriaDialogData: TCategoria | undefined
  materialDialogData: TMaterial | undefined
  fornecedoraDialogData: TFornecedora | undefined
  transportadoraDialogData: TTransportadora | undefined
  requisitanteDialogData: TRequisitante | undefined
  localDeAplicacaoDialogData: TLocalDeAplicacao | undefined
  vinculoMaterialFornecedoraDialogData: TVinculoMaterialFornecedora | undefined
  materiaisVinculadosDialogData: TVinculoMaterialFornecedora[] | undefined

  setCategoriaDialogData: (data: TCategoria | undefined) => void
  setMaterialDialogData: (data: TMaterial | undefined) => void
  setFornecedoraDialogData: (data: TFornecedora | undefined) => void
  setTransportadoraDialogData: (data: TTransportadora | undefined) => void
  setRequisitanteDialogData: (data: TRequisitante | undefined) => void
  setLocalDeAplicacaoDialogData: (data: TLocalDeAplicacao | undefined) => void
  setMateriaisVinculadosDialogData: (data: TVinculoMaterialFornecedora[] | undefined) => void
  setVinculoMaterialFornecedoraDialogData: (
    updater:
      | TVinculoMaterialFornecedora
      | ((old: TVinculoMaterialFornecedora | undefined) => TVinculoMaterialFornecedora | undefined)
      | undefined
  ) => void
}

export const useDialogDataStore = create<dialogDataStore>()(set => ({
  categoriaDialogData: undefined,
  materialDialogData: undefined,
  fornecedoraDialogData: undefined,
  transportadoraDialogData: undefined,
  requisitanteDialogData: undefined,
  localDeAplicacaoDialogData: undefined,
  vinculoMaterialFornecedoraDialogData: undefined,
  materiaisVinculadosDialogData: undefined,
  setCategoriaDialogData: (data: TCategoria | undefined) =>
    set(() => ({
      categoriaDialogData: data
    })),
  setMaterialDialogData: (data: TMaterial | undefined) =>
    set(() => ({
      materialDialogData: data
    })),
  setFornecedoraDialogData: (data: TFornecedora | undefined) =>
    set(() => ({
      fornecedoraDialogData: data
    })),
  setTransportadoraDialogData: (data: TTransportadora | undefined) =>
    set(() => ({
      transportadoraDialogData: data
    })),
  setRequisitanteDialogData: (data: TRequisitante | undefined) =>
    set(() => ({
      requisitanteDialogData: data
    })),
  setLocalDeAplicacaoDialogData: (data: TLocalDeAplicacao | undefined) =>
    set(() => ({
      localDeAplicacaoDialogData: data
    })),
  setMateriaisVinculadosDialogData: (data: TVinculoMaterialFornecedora[] | undefined) =>
    set(() => ({
      materiaisVinculadosDialogData: data
    })),
  setVinculoMaterialFornecedoraDialogData: (
    updater:
      | TVinculoMaterialFornecedora
      | ((old: TVinculoMaterialFornecedora | undefined) => TVinculoMaterialFornecedora | undefined)
      | undefined
  ) =>
    set(state => ({
      vinculoMaterialFornecedoraDialogData:
        typeof updater === 'function' ? updater(state.vinculoMaterialFornecedoraDialogData) : updater
    }))
}))
