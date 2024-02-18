import { CategoriaService } from '@/services/CategoriaService'
import { TCategoria } from '@/types/models'
import { QueryBase } from './QueryBase'

export class CategoriaQueries extends QueryBase<TCategoria> {
  constructor() {
    super('CATEGORIA-KEY', new CategoriaService())
  }
}
