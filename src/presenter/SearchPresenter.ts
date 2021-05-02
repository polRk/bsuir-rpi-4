import type { ISearchModel } from '../model'
import { Renderer, RenderPosition } from '../renderer'
import { debounce } from '../utils'
import type { ISearchViewFactory } from '../view'

export class SearchPresenter {
  constructor(
    private container: HTMLElement,
    private viewFactory: ISearchViewFactory,
    private model: ISearchModel,
  ) {
    this.handleInput = this.handleInput.bind(this)
  }

  public init() {
    this.drawSearchInput()

    // TODO: maybe in a future, i should subscribe for searchModel updates, but not now
  }

  private drawSearchInput() {
    const view = this.viewFactory(this.model.search)

    Renderer.render(
      this.container,
      view.getElement(),
      RenderPosition.BEFORE_END,
    )

    view.getElement().addEventListener('input', debounce(this.handleInput, 300))
  }

  private handleInput(e: Event) {
    this.model.search = (e.target as HTMLInputElement).value
  }
}
