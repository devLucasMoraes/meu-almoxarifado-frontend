import { LocalDeAplicacaoService } from '@/services/LocalDeAplicacaoService'
import { TLocalDeAplicacao } from '@/types/models'
import { QueryBase } from './QueryBase'

class LocalDeAplicacaoQueries extends QueryBase<TLocalDeAplicacao> {
  constructor() {
    super('LOCAL-KEY', new LocalDeAplicacaoService())
  }
}

export const localDeAplicacaoQueries = new LocalDeAplicacaoQueries()
