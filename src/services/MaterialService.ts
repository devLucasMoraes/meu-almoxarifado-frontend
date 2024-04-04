import { ApiInstance } from '@/api'
import { Environment } from '@/environment'
import { TAcerto, TAutocompleteOption, TMaterial, TSpringPageData } from '@/types/models'
import { BaseService } from './BaseService'

export class MaterialService extends BaseService<
  TMaterial,
  TSpringPageData<TMaterial>,
  TSpringPageData<TAutocompleteOption>
> {
  constructor() {
    super('/materiais')
  }

  async getEstoque(page = 0, size = Environment.LIMITE_DE_LINHAS): Promise<TSpringPageData<TMaterial>> {
    const path = `/estoque?page=${page}&size=${size}`

    const response = await ApiInstance.get<TSpringPageData<TMaterial>>(`${this.endpoint}${path}`)

    return response.data
  }

  async acertoEstoque(data: TAcerto): Promise<TAcerto> {
    const response = await ApiInstance.patch(`${this.endpoint}/estoque/acerto`, data)
    return response.data
  }
}

export const materialService = new MaterialService()
