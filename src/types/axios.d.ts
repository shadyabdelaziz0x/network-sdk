import 'axios'

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retryCount?: number // Add _retryCount to InternalAxiosRequestConfig
  }
}
