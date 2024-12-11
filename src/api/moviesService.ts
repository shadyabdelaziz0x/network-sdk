import { Movie } from '../types/getMovieDetailsResponse'
import { GetMoviesResponse } from '../types/getMoviesResponse'
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
    return this.api.get<Movie>(`/?tt=${movieId}`)
  }
}

export default MoviesService
