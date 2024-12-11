import { GetMovieDetailsResponse, GetMoviesResponse } from '../types'
import { generateRandomWord } from '../utils'
import ApiClient from './apiClient'

class MoviesService {
  private api: ApiClient

  constructor(api: ApiClient) {
    this.api = api
  }

  public searchMovies(query: string) {
    return this.api.get<GetMoviesResponse>(`/?q=${query}`)
  }

  public getRandomMovies() {
    return this.api.get<GetMoviesResponse>(`/?q=${generateRandomWord()}`)
  }

  public getMovieDetails(movieId: string) {
    return this.api.get<GetMovieDetailsResponse>(`/?tt=${movieId}`)
  }
}

export default MoviesService
