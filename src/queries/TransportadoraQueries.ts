import { TransportadoraService } from '@/services/TransportadoraService'
import { TTransportadora } from '@/types/models'
import { QueryBase } from './QueryBase'

class TransportadoraQueries extends QueryBase<TTransportadora> {
  constructor() {
    super('TRANSPORTADORA-KEY', new TransportadoraService())
  }
}

export const transportadoraQueries = new TransportadoraQueries()
