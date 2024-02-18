import { MaterialService } from '@/services/MaterialService'
import { TMaterial } from '@/types/models'
import { QueryBase } from './QueryBase'

export class MaterialQueries extends QueryBase<TMaterial> {
  constructor() {
    super('MATERIAL-KEY', new MaterialService())
  }
}
