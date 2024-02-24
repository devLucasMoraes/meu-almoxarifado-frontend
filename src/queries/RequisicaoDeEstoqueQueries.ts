import { RequisicaoDeEstoqueService } from '@/services/RequisicaoDeEstoqueService'
import { TRequisicaoDeEstoque } from '@/types/models'
import { QueryBase } from './QueryBase'

class RequisicaoDeEstoqueQueries extends QueryBase<TRequisicaoDeEstoque> {
  constructor() {
    super('REQUISICAO-KEY', new RequisicaoDeEstoqueService())
  }
}

export const requisicaoDeEstoqueQueries = new RequisicaoDeEstoqueQueries()
