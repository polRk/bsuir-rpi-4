import { AbstractView } from './abstract'

export interface IArticleContainerView extends AbstractView<HTMLDivElement> {
}

export class ArticleContainerView extends AbstractView<HTMLDivElement> implements IArticleContainerView {
  getTemplate(): string {
    return `<div id="article" class="flex flex-col max-w-screen-sm"></div>`
  }
}
