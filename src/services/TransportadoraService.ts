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
}
