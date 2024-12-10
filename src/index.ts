import ApiClient from './api/apiClient'
import MoviesService from './api/moviesService'
import { API_BASE_URL } from './constants/config'

const apiClient = new ApiClient(API_BASE_URL)

export const moviesService = new MoviesService(apiClient)
