import { TAutocompleteOption, TMaterial, TSpringPageData } from '@/types/models'
import { BaseService } from './BaseService'

export class MaterialService extends BaseService<
  TMaterial,
  TSpringPageData<TMaterial>,
  TSpringPageData<TAutocompleteOption>
> {
  constructor() {
    super('/materiais')
  }
}
