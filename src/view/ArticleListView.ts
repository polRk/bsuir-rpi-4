import { AbstractView } from './abstract'

export interface IArticleListView extends AbstractView<HTMLOListElement> {
}

export class ArticleListView extends AbstractView<HTMLOListElement> implements IArticleListView {
  getTemplate(): string {
    return `<ol class="flex flex-col gap-4"></ol>`
  }
}
