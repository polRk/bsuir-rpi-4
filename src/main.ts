import './_style.css'
import { CachedApiClient } from './apiClient'
import { ArticleModel, IArticle, ILanguage, ISearch, ISource, LanguageModel, SearchModel, SourceModel } from './model'
import { ArticlePresenter, LanguagePresenter, SearchPresenter, SourcePresenter } from './presenter'
import { Renderer, RenderPosition } from './renderer'
import {
  ArticleContainerView,
  ArticleListView,
  ArticleView, LanguageContainerView,
  LanguageSelectView,
  LanguageView,
  NewsContainerView, SearchContainerView,
  SearchView, SidebarContainerView, SourceContainerView,
  SourceSelectView,
  SourceView,
} from './view'

// 649d6f36e31346f283d52e0236eeab20
// 18ea93c9b78347388caee26dfb38ccd5
// fbc8b382ffde4f5594a85c06379e62b6

const apiClient = new CachedApiClient('fbc8b382ffde4f5594a85c06379e62b6')

const searchModel = new SearchModel()
const languageModel = new LanguageModel()
const articlesModel = new ArticleModel(apiClient)
const sourcesModel = new SourceModel(apiClient)

const newsContainer = new NewsContainerView().getElement()
const sidebarContainer = new SidebarContainerView().getElement()

const searchContainer = new SearchContainerView().getElement()
const languageContainer = new LanguageContainerView().getElement()
const sourceContainer = new SourceContainerView().getElement()
const articleContainer = new ArticleContainerView().getElement()

const languageSelectView = new LanguageSelectView()
const sourceSelectView = new SourceSelectView()
const articleListView = new ArticleListView()

const searchViewFactory = (search: ISearch) => new SearchView(search)
const languageViewFactory = (language: ILanguage) => new LanguageView(language)
const sourceViewFactory = (source: ISource) => new SourceView(source)
const articleViewFactory = (article: IArticle) => new ArticleView(article)

const searchPresenter = new SearchPresenter(searchContainer, searchViewFactory, searchModel)
const languagePresenter = new LanguagePresenter(languageContainer, languageSelectView, languageViewFactory, languageModel)
const sourcePresenter = new SourcePresenter(sourceContainer, sourceSelectView, sourceViewFactory, sourcesModel, languageModel)
const articlePresenter = new ArticlePresenter(articleContainer, articleListView, articleViewFactory, articlesModel, searchModel, languageModel, sourcesModel)

searchPresenter.init()
languagePresenter.init()
sourcePresenter.init()
  .then(() => articlePresenter.init())

Renderer.render(document.body, sidebarContainer, RenderPosition.BEFORE_END)
Renderer.render(document.body, newsContainer, RenderPosition.BEFORE_END)

Renderer.render(sidebarContainer, searchContainer, RenderPosition.BEFORE_END)
Renderer.render(sidebarContainer, languageContainer, RenderPosition.BEFORE_END)
Renderer.render(sidebarContainer, sourceContainer, RenderPosition.BEFORE_END)
Renderer.render(newsContainer, articleContainer, RenderPosition.AFTER_BEGIN)
