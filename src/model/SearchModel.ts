import { Observer } from '../observer'

export type ISearch = string

export interface ISearchModel extends Observer {
  search: ISearch
}

export class SearchModel extends Observer implements ISearchModel {
  private _search: ISearch = ''

  get search(): ISearch {
    return this._search
  }

  set search(value: ISearch) {
    this._search = value

    this.notify()
  }
}
