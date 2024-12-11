import { GetMovieDetailsResponse, GetMoviesResponse } from '../types'
import ApiClient from './apiClient'

class MoviesService {
  private api: ApiClient

  constructor(api: ApiClient) {
    this.api = api
  }

  public getMovies(query: string) {
    return this.api.get<GetMoviesResponse>(`/?q=${query}`)
  }

  public getMovie(movieId: string) {
    return this.api.get<GetMovieDetailsResponse>(`/?tt=${movieId}`)
  }
}

export default MoviesService
