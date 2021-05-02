import { ISource } from '../model'
import { AbstractView } from './abstract'

export interface ISourceView extends AbstractView<HTMLOptionElement> {
}

export interface ISourceViewFactory {
  (source: ISource): ISourceView
}

export class SourceView extends AbstractView<HTMLOptionElement> implements ISourceView {
  constructor(private source: ISource) {
    super()
  }

  getTemplate(): string {
    const { id, name } = this.source
    return `<option value="${id}">${name}</option>`
  }
}
