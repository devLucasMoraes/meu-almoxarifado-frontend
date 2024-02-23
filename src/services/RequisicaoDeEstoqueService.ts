import { TAutocompleteOption, TRequisicaoDeEstoque, TSpringPageData } from '@/types/models'
import { BaseService } from './BaseService'

export class RequisicaoDeEstoqueService extends BaseService<
  TRequisicaoDeEstoque,
  TSpringPageData<TRequisicaoDeEstoque>,
  TSpringPageData<TAutocompleteOption>
> {
  constructor() {
    super('/requisicoes')
  }
}
