import { TAutocompleteOption, TLocalDeAplicacao, TSpringPageData } from '@/types/models'
import { BaseService } from './BaseService'

export class LocalDeAplicacaoService extends BaseService<
  TLocalDeAplicacao,
  TSpringPageData<TLocalDeAplicacao>,
  TSpringPageData<TAutocompleteOption>
> {
  constructor() {
    super('/locais')
  }
}
