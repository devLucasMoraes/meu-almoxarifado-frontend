import { TransportadoraService } from '@/services/TransportadoraService'
import { TTransportadora } from '@/types/models'
import { QueryBase } from './QueryBase'

export class TransportadoraQueries extends QueryBase<TTransportadora> {
  constructor() {
    super('TRANSPORTADORA-KEY', new TransportadoraService())
  }
}
