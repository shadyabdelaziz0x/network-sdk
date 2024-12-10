import ApiClient from './apiClient'

class MoviesService {
  private api: ApiClient

  constructor(api: ApiClient) {
    this.api = api
  }

  public getMovies(query: string) {
    return this.api.get(`/?q=${query}`)
  }

  public getMovie(movieId: string) {
    return this.api.get(`/?tt=${movieId}`)
  }
}

export default MoviesService
