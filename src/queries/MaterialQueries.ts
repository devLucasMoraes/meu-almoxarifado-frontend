import { MaterialService } from '@/services/MaterialService'
import { TMaterial } from '@/types/models'
import { QueryBase } from './QueryBase'

class MaterialQueries extends QueryBase<TMaterial> {
  constructor() {
    super('MATERIAL-KEY', new MaterialService())
  }
}

export const materialQueries = new MaterialQueries()
