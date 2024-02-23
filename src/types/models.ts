import { Unidade } from './enum'

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

export type TLocalDeAplicacao = {
  id: number
  nome: string
}

export type TItemNfeDeCompra = {
  idItem: number
  idMaterial: number
  undCom: Unidade
  quantCom: number
  valorUntCom: number
  valorIpi: number
  descricaoFornecedora: string
  referenciaFornecedora: string
}

export type TItemRequisicaoDeEstoque = {
  idItem: number
  idMaterial: number
  undConsumo: string
  quantEntregue: number
  valorUntEntregue: number
}

export type TRequisicaoDeEstoque = {
  id: number
  dataRequisicao: Date
  valorTotal: number
  obs: string
  ordemProducao: string
  idRequisitante: number
  idLocalDeAplicacao: number
  itens: TItemRequisicaoDeEstoque[]
}

export type TNfeDeCompra = {
  id: number
  nfe: string
  chaveNfe: string
  dataEmissao: Date
  dataRecebimento: Date
  valorFrete: number
  valorSeguro: number
  valorDesconto: number
  valorOutros: number
  valorTotalIpi: number
  valorTotalProdutos: number
  valorTotalNfe: number
  obs: string
  idTransportadora: number
  idFornecedora: number
  itens: TItemNfeDeCompra[]
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
