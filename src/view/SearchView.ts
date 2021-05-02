import { ISearch } from '../model'
import { AbstractView } from './abstract'

export interface ISearchView extends AbstractView<HTMLInputElement> {
}

export interface ISearchViewFactory {
  (search: ISearch): ISearchView
}

export class SearchView extends AbstractView<HTMLInputElement> implements ISearchView {
  constructor(private search: ISearch) {
    super()
  }

  getTemplate(): string {
    return `<input id="search__control" type="search" placeholder="Search ..." value="${this.search}"/>`
  }
}
