import { Environment } from '@/environment'
import { FornecedoraService } from '@/services/FornecedoraService'
import { TFornecedora } from '@/types/models'
import { queryOptions } from '@tanstack/react-query'
import { QueryBase } from './QueryBase'

class FornecedoraQueries extends QueryBase<TFornecedora> {
  constructor() {
    super('FORNECEDORA-KEY', new FornecedoraService())
  }

  getByCnpj(path: string, page = 0, pageSize = Environment.LIMITE_DE_LINHAS) {
    return queryOptions({
      queryKey: [this.resourceKey, page, pageSize],
      queryFn: () => this.service.dynamicGetAll(path, page, pageSize)
    })
  }
}

export const fornecedoraQueries = new FornecedoraQueries()
