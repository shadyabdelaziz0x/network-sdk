import { AxiosError, AxiosInstance } from 'axios'

const MAX_RETRIES = 3

export const retryRequest = async (
  error: AxiosError,
  client: AxiosInstance
) => {
  const config = error.config

  if (!config || config._retryCount >= MAX_RETRIES) {
    throw error // Exceeded max retries
  }

  config._retryCount = (config._retryCount || 0) + 1

  // Wait before retrying
  await new Promise(resolve => setTimeout(resolve, 1000 * config._retryCount))

  return client.request(config)
}
