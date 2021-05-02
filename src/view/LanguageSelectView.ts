import { AbstractView } from './abstract'

export interface ILanguageSelectView extends AbstractView<HTMLSelectElement> {
}

export class LanguageSelectView extends AbstractView<HTMLSelectElement> implements ILanguageSelectView {
  getTemplate(): string {
    return `<select id="language__control" name="language"></select>`
  }
}
