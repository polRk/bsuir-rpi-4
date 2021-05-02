import { Renderer } from '../renderer'

export abstract class AbstractView<T extends HTMLElement> {
  protected element: T | null = null

  abstract getTemplate(): string

  getElement(): T {
    if (!this.element) {
      this.element = Renderer.createElement<T>(this.getTemplate())
    }

    return this.element
  }

  removeElement() {
    this.element = null
  }
}
