import { Environment } from '@/environment'
import { TransportadoraService } from '@/services/TransportadoraService'
import { TTransportadora } from '@/types/models'
import { queryOptions } from '@tanstack/react-query'
import { QueryBase } from './QueryBase'

class TransportadoraQueries extends QueryBase<TTransportadora> {
  constructor() {
    super('TRANSPORTADORA-KEY', new TransportadoraService())
  }

  getByCnpj(path: string, page = 0, pageSize = Environment.LIMITE_DE_LINHAS) {
    return queryOptions({
      queryKey: [this.resourceKey, page, pageSize],
      queryFn: () => this.service.dynamicGetAll(path, page, pageSize)
    })
  }
}

export const transportadoraQueries = new TransportadoraQueries()
