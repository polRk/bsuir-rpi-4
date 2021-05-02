import type { IArticleModel, ILanguageModel, ISearchModel, ISourceModel } from '../model'
import { Renderer, RenderPosition } from '../renderer'
import type { IArticleListView, IArticleViewFactory } from '../view'

export class ArticlePresenter {
  private readonly list: HTMLOListElement
  private readonly observer: IntersectionObserver

  constructor(
    private container: HTMLElement,
    private articleListView: IArticleListView,
    private viewFactory: IArticleViewFactory,
    private model: IArticleModel,
    private searchModel: ISearchModel,
    private languageModel: ILanguageModel,
    private sourcesModel: ISourceModel,
  ) {
    this.list = this.articleListView.getElement()
    this.handleIntersectionObserver = this.handleIntersectionObserver.bind(this)
    this.observer = new IntersectionObserver(this.handleIntersectionObserver)
  }

  public async init() {
    await this.fetchArticles()

    this.drawArticleList()
    this.drawArticleListItems()

    this.searchModel.subscribe(() => {
      this.fetchArticles()
    })

    this.languageModel.subscribe(() => {
      this.fetchArticles()
    })

    this.sourcesModel.subscribe(() => {
      this.fetchArticles()
    })

    this.model.subscribe(() => {
      this.drawArticleListItems()
    })
  }

  private fetchArticles() {
    return this.model.fetchArticles({
      search: this.searchModel.search,
      language: this.languageModel.language,
      sources: this.sourcesModel.selected.map(source => source.id).join(','),
    })
  }

  private drawArticleList() {
    Renderer.render(this.container, this.list, RenderPosition.BEFORE_END)
  }

  private drawArticleListItems() {
    this.list.innerHTML = ''

    this.model.articles.forEach((article, index) => {
      const view = this.viewFactory(article)
      Renderer.render(this.list, view.getElement(), RenderPosition.BEFORE_END)

      if (index === this.model.articles.length * 0.7) {
        this.drawSentinel()
      }
    })
  }

  private drawSentinel() {
    const sentinel = Renderer.createElement('<div class="sentinel"/>')
    Renderer.render(this.list, sentinel, RenderPosition.BEFORE_END)

    this.observer.observe(sentinel)
  }

  private handleIntersectionObserver(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    const entry = entries.find(v => v.intersectionRatio)
    if (entry) {
      observer.unobserve(entry.target)

      return this.model.fetchMoreArticles({
        search: this.searchModel.search,
        language: this.languageModel.language,
        sources: this.sourcesModel.selected.map(source => source.id).join(','),
      })
    }

    return void 0
  }
}
