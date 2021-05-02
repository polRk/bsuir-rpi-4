import { AbstractView } from './abstract'

export interface ISearchContainerView extends AbstractView<HTMLDivElement> {
}

export class SearchContainerView extends AbstractView<HTMLDivElement> implements ISearchContainerView {
  getTemplate(): string {
    return `<div id="search" class="flex flex-col w-full"><label for="search__control" class="text-sm font-bold">Search: </label></div>`
  }
}
