import { NfeDeCompraService } from '@/services/NfeDeCompraService'
import { TNfeDeCompra } from '@/types/models'
import { QueryBase } from './QueryBase'

class NfeDeCompraQueries extends QueryBase<TNfeDeCompra> {
  constructor() {
    super('NFE-COMPRA-KEY', new NfeDeCompraService())
  }
}

export const nfeDeCompraQueries = new NfeDeCompraQueries()
