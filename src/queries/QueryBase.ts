/* eslint-disable react-hooks/rules-of-hooks */
import { BaseService } from '@/services/BaseService'
import { TAutocompleteOption, TSpringPageData } from '@/types/models'
import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query'

export class QueryBase<T> {
  constructor(
    private resourceName: string,
    private service: BaseService<T, TSpringPageData<T>, TSpringPageData<TAutocompleteOption>>
  ) {}

  getById(id: number) {
    return queryOptions({
      queryKey: [this.resourceName, id],
      queryFn: () => this.service.getById(id)
    })
  }

  getAll(page: number, pageSize: number) {
    return queryOptions({
      queryKey: [this.resourceName, page, pageSize],
      queryFn: () => this.service.getAll(page, pageSize)
    })
  }

  searchTerm(term: string, page: number, pageSize: number) {
    return queryOptions({
      queryKey: [this.resourceName, term, page, pageSize],
      queryFn: () => this.service.searchTerm(term, page, pageSize)
    })
  }

  create() {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (data: T) => this.service.create(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [this.resourceName] })
      },
      onError: error => {
        alert(error)
      }
    })
  }

  updateById(id: number) {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (data: T) => this.service.updateById(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [this.resourceName] })
      },
      onError: error => {
        alert(error)
      }
    })
  }

  deleteById() {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (id: number) => this.service.deleteById(id),
      onSuccess: id => {
        queryClient.invalidateQueries({ queryKey: [this.resourceName] })
        alert('Registro apagado com sucesso!')
      },
      onError: error => {
        alert(error)
      }
    })
  }
}
