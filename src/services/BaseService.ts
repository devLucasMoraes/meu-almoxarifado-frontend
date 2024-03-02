import { ApiInstance } from '@/api'
import { Environment } from '@/environment'

export class BaseService<T, TSpringPageData, TSpringPageDataAutocomplete> {
  constructor(private endpoint: string) {}

  async getAll(page = 0, size = Environment.LIMITE_DE_LINHAS): Promise<TSpringPageData> {
    const path = `?page=${page}&size=${size}`

    const response = await ApiInstance.get<TSpringPageData>(`${this.endpoint}${path}`)

    return response.data
  }

  async dynamicGetAll(path: string, page = 0, size = Environment.LIMITE_DE_LINHAS): Promise<TSpringPageData> {
    const response = await ApiInstance.get<TSpringPageData>(`${this.endpoint}/query?${path}&page=${page}&size=${size}`)

    return response.data
  }

  async searchTerm(term = '', page = 0, size = Environment.LIMITE_DE_LINHAS): Promise<TSpringPageDataAutocomplete> {
    const path = `?label=${term}&page=${page}&size=${size}`

    const response = await ApiInstance.get<TSpringPageDataAutocomplete>(`${this.endpoint}/autocomplete${path}`)

    return response.data
  }

  async getById(id: number): Promise<T> {
    const response = await ApiInstance.get<T>(`${this.endpoint}/show/${id}`)

    return response.data
  }

  async create(data: T): Promise<T> {
    const response = await ApiInstance.post(`${this.endpoint}/create`, data)
    return response.data
  }

  async updateById(id: number, data: T): Promise<T> {
    const response = await ApiInstance.put(`${this.endpoint}/edit/${id}`, data)
    return response.data
  }

  async deleteById(id: number): Promise<void> {
    await ApiInstance.delete(`${this.endpoint}/delete/${id}`)
  }
}
