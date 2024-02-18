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
}
