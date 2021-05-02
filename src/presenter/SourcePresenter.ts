import type { ILanguageModel, ISourceModel } from '../model'
import { Renderer, RenderPosition } from '../renderer'
import type { ISourceSelectView, ISourceViewFactory } from '../view'

export class SourcePresenter {
  private readonly select: HTMLSelectElement

  constructor(
    private container: HTMLDivElement,
    private sourceSelectView: ISourceSelectView,
    private viewFactory: ISourceViewFactory,
    private model: ISourceModel,
    private languageModel: ILanguageModel,
  ) {
    this.select = this.sourceSelectView.getElement()
    this.select.addEventListener('change', this.handleSelect.bind(this))
  }

  public async init() {
    await this.fetchSources()
    this.drawSourceSelect()
    this.drawSourceSelectOptions()

    this.languageModel.subscribe(() => {
      this.fetchSources()
    })

    this.model.subscribe(() => {
      this.drawSourceSelectOptions()
    })
  }

  private fetchSources() {
    return this.model.fetchSources({
      language: this.languageModel.language,
    })
  }

  private drawSourceSelect() {
    Renderer.render(this.container, this.select, RenderPosition.BEFORE_END)
  }

  protected drawSourceSelectOptions() {
    this.select.innerHTML = ''

    this.model.sources.forEach((source) => {
      const view = this.viewFactory(source)
      Renderer.render(this.select, view.getElement(), RenderPosition.BEFORE_END)

      if (this.model.selected.includes(source)) {
        view.getElement().setAttribute('selected', '')
      }
    })
  }

  private handleSelect() {
    const selectedOptions = [].slice.call(this.select.selectedOptions) as HTMLOptionElement[]
    const selectedValues = selectedOptions.map(selectedOption => selectedOption.value)

    this.model.selected = this.model.sources.filter(({ id }) => selectedValues.includes(id))
  }
}
