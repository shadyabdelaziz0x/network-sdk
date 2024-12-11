import { ApiClient, MoviesService } from './api'
import { API_BASE_URL } from './constants'
import { GetMovieDetailsResponse, GetMoviesResponse } from './types'

const apiClient = new ApiClient(API_BASE_URL)

export const moviesService = new MoviesService(apiClient)

export type { GetMoviesResponse, GetMovieDetailsResponse }
