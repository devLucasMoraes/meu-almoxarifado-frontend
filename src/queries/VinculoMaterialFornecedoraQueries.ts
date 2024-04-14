import {
  VinculoMaterialFornecedoraService,
  vinculoMaterialFornecedoraService
} from '@/services/VinculoMaterialFornecedoraService'
import { TVinculoMaterialFornecedora } from '@/types/models'
import { queryOptions } from '@tanstack/react-query'
import { QueryBase } from './QueryBase'

class VinculoMaterialFornecedoraQueries extends QueryBase<TVinculoMaterialFornecedora> {
  constructor() {
    super('VINCULO-KEY', new VinculoMaterialFornecedoraService())
  }

  dynamicGetOne(query: string) {
    return queryOptions({
      queryKey: [this.resourceKey, query],
      queryFn: () => vinculoMaterialFornecedoraService.dynamicGetOne(query)
    })
  }
}

export const vinculoMaterialFornecedoraQueries = new VinculoMaterialFornecedoraQueries()
