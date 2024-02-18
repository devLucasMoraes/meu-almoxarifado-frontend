import axios from 'axios'
import { Environment } from '../environment'
import { errorInterceptor, responseInterceptor } from './interceptors'

const ApiInstance = axios.create({
  baseURL: Environment.URL_BASE
})

ApiInstance.interceptors.response.use(
  response => responseInterceptor(response),
  error => errorInterceptor(error)
)

export { ApiInstance }
