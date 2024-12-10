export class Cache {
  private store: Map<string, any>

  constructor() {
    this.store = new Map()
  }

  public set(key: string, value: any) {
    this.store.set(key, value)
  }

  public get(key: string): any | null {
    return this.store.get(key) || null
  }

  public clear() {
    this.store.clear()
  }
}
