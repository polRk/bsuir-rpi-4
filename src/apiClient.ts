import type { IArticle, ISource } from './model'

export interface ISuccessResponse {
  status: 'ok'
}

export interface IErrorResponse {
  status: 'error'
  code: string
  message: string
}

export type IArticlesResponse = ISuccessResponse & {
  totalResults: number
  articles: IArticle[]
} | IErrorResponse

export type ISourcesResponse = ISuccessResponse & {
  sources: ISource[]
} | IErrorResponse

export interface GetSourcesRequestParams {
  category?: 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology'
  language?: string
  country?: string
}

export interface GetArticlesRequestParams {
  q?: string
  qInTitle?: string
  sources?: string // comma-seperated
  domains?: string // comma-seperated
  excludeDomains?: string // comma-seperated
  from?: string // ISO date string
  to?: string // ISO date string
  language?: string
  sortBy?: 'relevancy' | 'popularity' | 'publishedAt'
  pageSize?: number
  page?: number
}

export interface IApiClient {
  perPage: number

  getSources(parameters?: GetSourcesRequestParams): Promise<ISourcesResponse>

  getArticles(parameters?: GetArticlesRequestParams): Promise<IArticlesResponse>
}

const REVALIDATE_TIME = 5 * 60 * 1000

const PAGE_SIZE = 40

export class ApiClient implements IApiClient {
  readonly perPage = PAGE_SIZE

  protected baseURL = 'https://newsapi.org'

  constructor(protected apiKey: string) {
  }

  getSources(parameters?: Record<string, string>): Promise<ISourcesResponse> {
    const query = new URLSearchParams({ ...parameters, apiKey: this.apiKey })
    const url = `${this.baseURL}/v2/sources?${query}`

    return fetch(url).then(r => r.json())
  }

  getArticles(parameters?: Record<string, string>): Promise<IArticlesResponse> {
    const query = new URLSearchParams({ ...parameters, apiKey: this.apiKey })
    const url = `${this.baseURL}/v2/everything?${query}`

    return fetch(url).then(r => r.json())
  }
}

export class CachedApiClient extends ApiClient implements IApiClient {
  constructor(protected apiKey: string) {
    super(apiKey)
  }

  private static writeToCache<T>(key: string, result: T) {
    const data = JSON.stringify({ updatedAt: new Date(), result })
    localStorage.setItem(key, data)

    setTimeout(() => localStorage.removeItem(key), REVALIDATE_TIME)
  }

  private static getFromCache<T>(key: string): T | null {
    const fromCache = JSON.parse(localStorage.getItem(key) || 'null') as { updatedAt: Date, result: T }
    if (!fromCache || new Date().getTime() - new Date(fromCache.updatedAt).getTime() > REVALIDATE_TIME) {
      return null
    }

    return fromCache.result
  }

  async getSources(parameters?: GetSourcesRequestParams): Promise<ISourcesResponse> {
    const language = navigator.language
    const query = new URLSearchParams({ language, ...parameters })
    const url = `${this.baseURL}/v2/sources?${query}`

    const fromCache = CachedApiClient.getFromCache<ISourcesResponse>(url)
    if (fromCache) return fromCache

    return super.getSources({ language, ...parameters }).then(result => {
      if (result.status === 'ok') {
        CachedApiClient.writeToCache(url, result)
      }

      return result
    })
  }

  async getArticles(parameters?: GetArticlesRequestParams): Promise<IArticlesResponse> {
    const { page, pageSize, ...rest } = { page: 1, pageSize: PAGE_SIZE, ...parameters }
    const searchParams: Record<string, string> = { page: `${page}`, pageSize: `${pageSize}`, ...rest }

    const query = new URLSearchParams(searchParams)
    const url = `${this.baseURL}/v2/everything?${query}`

    const fromCache = CachedApiClient.getFromCache<IArticlesResponse>(url)
    if (fromCache) return fromCache

    return super.getArticles(searchParams).then(result => {
      if (result.status === 'ok') {
        CachedApiClient.writeToCache(url, result)
      }

      return result
    })
  }
}
