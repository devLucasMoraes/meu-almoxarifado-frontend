import { ApiInstance } from '@/api'
import { TAutocompleteOption, TSpringPageData, TTransportadora } from '@/types/models'
import { BaseService } from './BaseService'

export class TransportadoraService extends BaseService<
  TTransportadora,
  TSpringPageData<TTransportadora>,
  TSpringPageData<TAutocompleteOption>
> {
  constructor() {
    super('/transportadoras')
  }

  async getByCnpj(cnpj: string): Promise<TTransportadora> {
    const response = await ApiInstance.get<TTransportadora>(`${this.endpoint}/show/cnpj/${cnpj}`)

    return response.data
  }
}

export const transportadoraService = new TransportadoraService()
