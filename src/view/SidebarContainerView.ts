import { AbstractView } from './abstract'

export interface ISidebarContainerView extends AbstractView<HTMLDivElement> {
}

export class SidebarContainerView extends AbstractView<HTMLDivElement> implements ISidebarContainerView {
  getTemplate(): string {
    return `<div id="sidebar" class="flex flex-col gap-2 max-h-[calc(100vh-2rem)] sticky top-4"></div>`
  }
}
