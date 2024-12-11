interface GetMovieDetailsResponse {
  short: ShortDetails
  imdbId: string
  top: TopDetails
  main: MainDetails
}

interface ShortDetails {
  '@context': string
  '@type': string
  url: string
  name: string
  alternateName?: string
  image: string
  description: string
  review?: Review
  aggregateRating?: AggregateRating
  contentRating?: string
  genre?: string[]
  datePublished?: string
  keywords?: string
  trailer?: Trailer
  actor?: Person[]
  director?: Person[]
  creator?: (Person | Organization)[]
  duration?: string
  [key: string]: unknown // Catch-all for unexpected fields
}

interface Review {
  '@type': string
  itemReviewed: { '@type': string; url: string }
  author: { '@type': string; name: string }
  dateCreated: string
  inLanguage: string
  name: string
  reviewBody: string
}

interface AggregateRating {
  '@type': string
  ratingCount: number
  bestRating: number
  worstRating: number
  ratingValue: number
}

interface Trailer {
  '@type': string
  name: string
  embedUrl: string
  thumbnail: { '@type': string; contentUrl: string }
  thumbnailUrl: string
  url: string
  description: string
  duration: string
  uploadDate: string
}

interface Person {
  '@type': string
  url: string
  name: string
}

interface Organization {
  '@type': string
  url: string
}

interface TopDetails {
  id: string
  productionStatus: ProductionStatus
  titleText: TitleText
  titleType: TitleType
  titleGenres?: Genre[]
  ratingsSummary?: RatingsSummary
  keywords: Keywords
  featuredReviews?: FeaturedReviews
  [key: string]: unknown // Catch-all for additional properties
}

interface ProductionStatus {
  currentProductionStage: ProductionStage
  productionStatusHistory: ProductionStatusHistory[]
  restriction: any
  __typename: string
}

interface ProductionStage {
  id: string
  text: string
  __typename: string
}

interface ProductionStatusHistory {
  status: ProductionStage
  __typename: string
}

interface TitleText {
  text: string
  __typename?: string
}

interface TitleType {
  id: string
  text: string
  canHaveEpisodes: boolean
}

interface Genre {
  text: string
  id: string
  __typename?: string
}

interface RatingsSummary {
  aggregateRating: number
  voteCount: number
}

interface ReviewNode {
  author: {
    nickName: string
    __typename: string
  }
  summary: {
    originalText: string
    __typename: string
  }
  text: {
    originalText: {
      plainText: string
      __typename: string
    }
    __typename: string
  }
  authorRating: number
  submissionDate: string
  __typename: string
}

interface ReviewEdge {
  node: ReviewNode
  __typename: string
}

interface KeywordNode {
  text: string
  __typename: string
}

interface KeywordEdge {
  node: KeywordNode
  __typename: string
}

interface Keywords {
  total: number
  edges: Array<KeywordEdge>
  __typename: string
}

interface FeaturedReviews {
  edges: Array<ReviewEdge>
  __typename: string
}

interface MainDetails {
  id: string
  wins?: AwardConnection
  nominationsExcludeWins?: AwardConnection
  isAdult?: boolean
  cast?: Cast[]
  genres?: Genre[]
  runtime?: Runtime
  videos?: Video[]
  featuredReviews?: FeaturedReviews
  keywords: Keywords
  [key: string]: unknown // Catch-all for additional properties
}

interface AwardConnection {
  total: number
}

interface Cast {
  name: Person
  category?: string
  characters?: string[]
}

interface Runtime {
  seconds: number
  displayableProperty?: {
    value: { plainText: string }
  }
}

interface Video {
  id: string
  name?: string
  runtime?: { value: number }
  thumbnail?: { url: string; height: number; width: number }
  playbackURLs?: PlaybackURL[]
}

interface PlaybackURL {
  displayName: { value: string }
  videoMimeType: string
  url: string
}

export { GetMovieDetailsResponse }
