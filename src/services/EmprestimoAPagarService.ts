import { TAutocompleteOption, TEmprestimo, TSpringPageData } from '@/types/models'
import { BaseService } from './BaseService'

export class EmprestimoAPagarService extends BaseService<
  TEmprestimo,
  TSpringPageData<TEmprestimo>,
  TSpringPageData<TAutocompleteOption>
> {
  constructor() {
    super('/emprestimos/a-pagar')
  }
}
