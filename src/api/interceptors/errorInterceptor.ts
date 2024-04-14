import { AxiosError } from 'axios'

export const errorInterceptor = (error: AxiosError<string>) => {
  if (error.response?.status === 500) {
    console.error('error 500', error)
    throw new Error(error.response?.data)
  }

  if (error.response?.status === 422) {
    console.error('error 422', error)
    throw new Error(error.response?.data)
  }

  return Promise.reject(error)
}
