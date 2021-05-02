import { ILanguage } from '../model'
import { AbstractView } from './abstract'

export interface ILanguageView extends AbstractView<HTMLOptionElement> {
}

export interface ILanguageViewFactory {
  (language: ILanguage): ILanguageView
}

export class LanguageView extends AbstractView<HTMLOptionElement> implements ILanguageView {
  constructor(private language: ILanguage) {
    super()
  }

  getTemplate(): string {
    return `<option name="language" value="${this.language}" class="capitalize">${this.language}</option>`
  }
}
