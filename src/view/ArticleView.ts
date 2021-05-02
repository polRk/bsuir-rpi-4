import { IArticle } from '../model'
import { AbstractView } from './abstract'

export interface IArticleView extends AbstractView<HTMLLIElement> {
}

export interface IArticleViewFactory {
  (article: IArticle): IArticleView
}

export class ArticleView extends AbstractView<HTMLLIElement> implements IArticleView {
  constructor(private article: IArticle) {
    super()
  }

  getTemplate(): string {
    const articleURL = new URL(this.article.url)

    return `
<li>
  <a href="${this.article.url}" target="_blank" class="text-blue-700"><h2 class="text-lg font-bold">${this.article.title}</h2></a>

  <a href="${this.article.url}" class="flex gap-1 items-center">
    <img src="https://s2.googleusercontent.com/s2/favicons?domain=${articleURL.hostname}" alt="favicon">
    <span class="flex-1 text-green-700 font-bold clip">${articleURL.hostname}<span class="font-medium">${articleURL.pathname}</span></span>
    <span class="text-gray-500">${new Date(this.article.publishedAt).toLocaleString()}</span>
  </a>
  <p>${this.article.description}</p>
</li>`
  }
}
