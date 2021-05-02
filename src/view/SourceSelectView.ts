import { AbstractView } from './abstract'

export interface ISourceSelectView extends AbstractView<HTMLSelectElement> {
}

export class SourceSelectView extends AbstractView<HTMLSelectElement> implements ISourceSelectView {
  getTemplate(): string {
    return `<select name="source[]" multiple class="h-full"></select>`
  }
}
