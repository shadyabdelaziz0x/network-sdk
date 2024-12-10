import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const MAX_RETRIES = 3
const NON_RETRYABLE_RESPONSE_CODES = [500, 502, 503, 504]

export const retryRequest = async (
  error: AxiosError,
  client: AxiosInstance
) => {
  const config = error.config as InternalAxiosRequestConfig
  const configRetryCount = config?._retryCount ?? 0
  if (!config || configRetryCount >= MAX_RETRIES) {
    throw error // Exceeded max retries
  }
  console.log('RETRY')
  // Only retry on certain HTTP status codes (e.g., server errors)
  if (!NON_RETRYABLE_RESPONSE_CODES.includes(error.response?.status || 0)) {
    throw error // Do not retry on client-side or non-retryable errors
  }

  config._retryCount = (configRetryCount || 0) + 1
  // Wait before retrying
  await new Promise(resolve => setTimeout(resolve, 1000 * configRetryCount))

  return client.request(config)
}
