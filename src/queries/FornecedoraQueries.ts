import { FornecedoraService } from '@/services/FornecedoraService'
import { TFornecedora } from '@/types/models'
import { QueryBase } from './QueryBase'

export class FornecedoraQueries extends QueryBase<TFornecedora> {
  constructor() {
    super('FORNECEDORA-KEY', new FornecedoraService())
  }
}

export const fornecedoraQueries = new FornecedoraQueries()
