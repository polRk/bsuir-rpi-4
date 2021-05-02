import type { ILanguage, ILanguageModel } from '../model'
import { Renderer, RenderPosition } from '../renderer'
import type { ILanguageSelectView, ILanguageViewFactory } from '../view'

export class LanguagePresenter {
  private readonly select: HTMLSelectElement

  constructor(
    private container: HTMLElement,
    private languageSelectView: ILanguageSelectView,
    private viewFactory: ILanguageViewFactory,
    private model: ILanguageModel,
  ) {
    this.select = this.languageSelectView.getElement()
    this.select.addEventListener('change', this.handleSelect.bind(this))
  }

  private get languageList(): ILanguage[] {
    return this.model.languages
  }

  public init() {
    this.drawLanguageSelect()
    this.drawLanguageSelectOptions()
  }

  private drawLanguageSelect() {
    Renderer.render(this.container, this.select, RenderPosition.BEFORE_END)
  }

  private drawLanguageSelectOptions() {
    this.languageList.forEach((language, index) => {
      const view = this.viewFactory(language)
      Renderer.render(this.select, view.getElement(), RenderPosition.BEFORE_END)

      if (language === this.model.language) {
        this.select.selectedIndex = index
      }
    })
  }

  private handleSelect() {
    this.model.language = this.select.options[this.select.selectedIndex].value
  }
}
