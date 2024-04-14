/* eslint-disable react-hooks/rules-of-hooks */
import { MaterialService, materialService } from '@/services/MaterialService'
import { TAcerto, TMaterial } from '@/types/models'
import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query'
import { QueryBase } from './QueryBase'

class MaterialQueries extends QueryBase<TMaterial> {
  constructor() {
    super('MATERIAL-KEY', new MaterialService())
  }

  getEstoque(page: number, pageSize: number) {
    return queryOptions({
      queryKey: [this.resourceKey, page, pageSize],
      queryFn: () => materialService.getEstoque(page, pageSize)
    })
  }

  acertoEstoque() {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (data: TAcerto) => materialService.acertoEstoque(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [this.resourceKey] })
      },
      onError: error => {
        alert(error)
      }
    })
  }
}

export const materialQueries = new MaterialQueries()
