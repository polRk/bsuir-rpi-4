import type { GetSourcesRequestParams, IApiClient } from '../apiClient'
import { Observer } from '../observer'

export interface ISource {
  id: string
  name: string
  description: string
  url: string
  category: string
  language: string
  country: string
}

export interface ISourceModel extends Observer {
  selected: ISource[]
  readonly sources: ISource[]

  fetchSources(parameters: GetSourcesRequestParams): Promise<ISource[]>
}

export class SourceModel extends Observer implements ISourceModel {
  private _sources: ISource[] = []
  private _selected: ISource[] = []

  constructor(private apiClient: IApiClient) {
    super()
  }

  get sources(): ISource[] {
    return this._sources
  }

  get selected(): ISource[] {
    return this._selected
  }

  set selected(value: ISource[]) {
    this._selected = value

    this.notify()
  }

  async fetchSources(parameters: GetSourcesRequestParams): Promise<ISource[]> {
    const response = await this.apiClient.getSources(parameters)
    if (response.status === 'error') {
      alert(response.message)
      return []
    }

    this._sources = response.sources
    const first = this._sources[0]

    if (first) {
      this._selected = [first]
    }

    // TODO: check if sources array was changed
    this.notify()

    return this._sources
  }
}
