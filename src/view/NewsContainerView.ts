import { AbstractView } from './abstract'

export interface INewsContainerView extends AbstractView<HTMLDivElement> {
}

export class NewsContainerView extends AbstractView<HTMLDivElement> implements INewsContainerView {
  getTemplate(): string {
    return `<div id="news"></div>`
  }
}
