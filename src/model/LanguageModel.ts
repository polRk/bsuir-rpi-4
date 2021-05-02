import { Observer } from '../observer'

export type ILanguage = string

export interface ILanguageModel extends Observer {
  language: ILanguage
  readonly languages: ILanguage[]
}

export class LanguageModel extends Observer implements ILanguageModel {
  private _language = navigator.language
  private _languages: ILanguage[] = ['ar', 'de', 'en', 'es', 'fr', 'he', 'it', 'nl', 'no', 'pt', 'ru', 'se', 'ud', 'zh']

  get language(): ILanguage {
    return this._language
  }

  get languages(): ILanguage[] {
    return this._languages
  }

  set language(value: string) {
    this._language = value

    this.notify()
  }
}
