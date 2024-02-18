export type TConversaoDeConsumo = {
  idConversao: number
  undConsumo: string
  undEstoque: string
  fatorDeConversao: number
}

export type TCategoria = {
  id: number
  nome: string
  undEstoque: string
  estoqueMinimo: number
  conversoesDeConsumo: TConversaoDeConsumo[]
}

export type TConversaoDeCompra = {
  idConversao: number
  undCompra: string
  undEstoque: string
  fatorDeConversao: number
}

export type TVinculoMaterialFornecedora = {
  idVinculo: number
  idFornecedora: number
  idMaterial: number
  referenciaFornecedora: string
  descricaoFornecedora: string
  conversoesDeCompra: TConversaoDeCompra[]
}

export type TMaterial = {
  id: number
  descricao: string
  valorUntMedAuto: boolean
  valorUntMed: number
  idCategoria: number
  qtdEmEstoque: number
  fornecedorasVinculadas?: TVinculoMaterialFornecedora[]
}

export type TFornecedora = {
  id: number
  nomeFantasia: string
  razaoSocial: string
  cnpj: string
  fone: string
}

export type TTransportadora = {
  id: number
  nomeFantasia: string
  razaoSocial: string
  cnpj: string
  fone: string
}

export type TRequisitante = {
  id: number
  nome: string
  fone: string
}

export type TAutocompleteOption = {
  id: number
  label: string
}

export type TSpringPageData<T> = {
  content: T[]
  pageable: {
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
  }
  last: boolean
  totalPages: number
  totalElements: number
  size: number
  number: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  first: boolean
  numberOfElements: number
  empty: boolean
}
