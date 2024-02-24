import { EmprestimoAPagarService } from '@/services/EmprestimoAPagarService'
import { TEmprestimo } from '@/types/models'
import { QueryBase } from './QueryBase'

class EmprestimoAPagarQueries extends QueryBase<TEmprestimo> {
  constructor() {
    super('EMPRESTIMOS-A-PAGAR-KEY', new EmprestimoAPagarService())
  }
}

export const emprestimoAPagarQueries = new EmprestimoAPagarQueries()
