export class Observer {
  private listeners: Function[] = []

  subscribe(cb: Function) {
    this.listeners.push(cb)

    return () => {
      this.listeners = this.listeners.filter(listener => listener !== cb)
    }
  }

  protected notify() {
    this.listeners.forEach(listener => listener())
  }
}
