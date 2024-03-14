import { ApiInstance } from '@/api'
import { TAutocompleteOption, TFornecedora, TSpringPageData } from '@/types/models'
import { BaseService } from './BaseService'

export class FornecedoraService extends BaseService<
  TFornecedora,
  TSpringPageData<TFornecedora>,
  TSpringPageData<TAutocompleteOption>
> {
  constructor() {
    super('/fornecedoras')
  }

  async getByCnpj(cnpj: string): Promise<TFornecedora> {
    const response = await ApiInstance.get<TFornecedora>(`${this.endpoint}/show/cnpj/${cnpj}`)

    return response.data
  }
}

export const fornecedoraService = new FornecedoraService()
