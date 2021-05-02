import { AbstractView } from './abstract'

export interface ILanguageContainerView extends AbstractView<HTMLDivElement> {
}

export class LanguageContainerView extends AbstractView<HTMLDivElement> implements ILanguageContainerView {
  getTemplate(): string {
    return `<div id="language" class="flex flex-col w-full"><label for="language__control" class="text-sm font-bold">Language: </label></div>`
  }
}
