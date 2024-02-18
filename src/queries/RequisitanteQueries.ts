import { RequisitanteService } from '@/services/RequisitanteService'
import { TRequisitante } from '@/types/models'
import { QueryBase } from './QueryBase'

export class RequisitanteQueries extends QueryBase<TRequisitante> {
  constructor() {
    super('REQUISITANTE-KEY', new RequisitanteService())
  }
}
