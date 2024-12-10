import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse
} from 'axios'
// import { retryRequest } from '../utils/retryHandler'
import { Cache } from '../utils/cache'
import axiosRetry from 'axios-retry'
import { handleApiError } from '../utils/apiError'

class ApiClient {
  private client: AxiosInstance
  private cache: Cache

  constructor(baseURL: string) {
    this.cache = new Cache() // Initialize cache utility

    this.client = axios.create({
      baseURL,
      timeout: 10000, // 10 seconds timeout
      headers: { 'Content-Type': 'application/json' }
    })

    // Configure axios-retry
    axiosRetry(this.client, {
      retries: 3, // Number of retry attempts
      retryDelay: axiosRetry.exponentialDelay, // Use exponential backoff delay
      retryCondition: error => {
        // Retry on network errors or 5xx server errors
        return (
          axiosRetry.isNetworkError(error) || axiosRetry.isRetryableError(error)
        )
      }
    })

    // Add request interceptor
    this.client.interceptors.request.use(this.handleRequest, error => {
      return Promise.reject(handleApiError(error))
    })

    // Add response interceptor
    this.client.interceptors.response.use(this.handleResponse, async error => {
      return Promise.reject({ ...error }) // Reject the promise with the handled error
    })
  }

  private handleRequest = (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig => {
    // Attach token if available
    const token = this.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }

  private handleResponse = (response: AxiosResponse): AxiosResponse => {
    // Cache GET responses
    if (response.config.method === 'get') {
      this.cache.set(response.config.url!, response.data)
    }
    return response
  }

  private getToken(): string | null {
    return null
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    // Check cache before making a request
    const cachedData = this.cache.get(url)
    if (cachedData) return cachedData as T

    return this.client.get(url, config).then(response => response.data)
  }

  public post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.client.post(url, data, config).then(response => response.data)
  }

  public put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.client.put(url, data, config).then(response => response.data)
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.delete(url, config).then(response => response.data)
  }
}

export default ApiClient
