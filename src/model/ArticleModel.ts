import type { IApiClient } from '../apiClient'
import { Observer } from '../observer'
import type { ISource } from './SourceModel'

export interface IArticle {
  source: Pick<ISource, 'id' | 'name'>
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}

interface IFetchArticlesParams {
  search?: string
  language?: string
  sources?: string
}

export interface IArticleModel extends Observer {
  readonly articles: IArticle[]
  totalResults: number

  fetchArticles(parameters?: IFetchArticlesParams): Promise<IArticle[]>

  fetchMoreArticles(parameters?: IFetchArticlesParams): Promise<IArticle[]>
}

export class ArticleModel extends Observer implements IArticleModel {
  private _articles: IArticle[] = []
  private _totalResults: number = 0

  constructor(private apiClient: IApiClient) {
    super()
  }

  get articles(): IArticle[] {
    return this._articles
  }

  get totalResults(): number {
    return this._totalResults
  }

  async fetchArticles(parameters?: IFetchArticlesParams): Promise<IArticle[]> {
    const { search: q, language, sources } = { ...parameters }

    const response = await this.apiClient.getArticles({ q, language, sources })
    if (response.status === 'error') {
      alert(response.message)
      return []
    }

    this._totalResults = response.totalResults
    this._articles = response.articles

    // TODO: check if articles array was changed
    this.notify()

    return response.articles
  }

  async fetchMoreArticles(parameters?: IFetchArticlesParams): Promise<IArticle[]> {
    const { search: q, language, sources } = { ...parameters }
    const nextPage = Math.floor(this._articles.length / this.apiClient.perPage) + 1

    const response = await this.apiClient.getArticles({ q, language, sources, page: nextPage })
    if (response.status === 'error') {
      alert(response.message)
      return []
    }

    this._articles.push(...response.articles)
    this.notify()

    return response.articles
  }
}
