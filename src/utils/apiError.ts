export interface APIError {
  status: number
  message: string
  errorCode?: string
}

export const handleApiError = (error: any): APIError => {
  const status = error?.response?.status
  const responseDescription = (error?.response?.data?.description ||
    'Unknown error occurred') as string
  const errorCode = error?.response?.data?.error_code
  let message = ''
  switch (status) {
    case 400:
      message = `Bad Request: ${responseDescription}`
      break
    case 401:
      message = 'Unauthorized: Please log in again.'
      break
    case 403:
      message = 'Forbidden: Access denied.'
      break
    case 404:
      message = 'Not Found: Resource does not exist.'
      break
    case 500:
      message = `Server Error: Please try again later.\n${responseDescription}`
      break
    case 502:
      message = `Bad Gateway: Server issue.\n${responseDescription}`
      break
    default:
      message = `Error: ${responseDescription}`
      break
  }
  return {
    status,
    message,
    errorCode
  }
}
