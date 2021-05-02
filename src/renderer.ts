import { AbstractView } from './view/abstract'

export enum RenderPosition {
  AFTER_BEGIN,
  BEFORE_END,
}

export class Renderer {
  static render(container: HTMLElement, child: HTMLElement, place: RenderPosition) {
    switch (place) {
      case RenderPosition.AFTER_BEGIN:
        container.prepend(child)
        break
      case RenderPosition.BEFORE_END:
        container.append(child)
        break
    }
  }

  static createElement<T extends HTMLElement>(template: string): T {
    const newElement = document.createElement('div')
    newElement.innerHTML = template

    return newElement.firstElementChild as T
  };

  static replace(newChild: HTMLElement, oldChild: HTMLElement) {
    const parent = oldChild.parentElement

    parent?.replaceChild(newChild, oldChild)
  };

  static remove(component: AbstractView<HTMLElement>) {
    component.getElement().remove()
    component.removeElement()
  };
}
