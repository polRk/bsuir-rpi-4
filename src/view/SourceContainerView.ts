import { AbstractView } from './abstract'

export interface ISourceContainerView extends AbstractView<HTMLDivElement> {
}

export class SourceContainerView extends AbstractView<HTMLDivElement> implements ISourceContainerView {
  getTemplate(): string {
    return `<div id="source" class="flex flex-col w-full h-full"><label for="source__control" class="text-sm font-bold">Sources: </label></div>`
  }
}
