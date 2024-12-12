export class Cache {
  private store: Map<string, any>
  //TODO:- ADD Limit to Cache
  private limit: number
  constructor() {
    this.store = new Map()
    this.limit = 200
  }

  public set(key: string, value: any) {
    if (this.store.size >= this.limit) {
      // Evict the first (oldest) entry to make space for the new one
      const oldestKey = this.store.keys().next().value
      oldestKey && this.store.delete(oldestKey)
    }
    this.store.set(key, value)
  }

  public get(key: string): any | null {
    return this.store.get(key) || null
  }

  public clear() {
    this.store.clear()
  }

  delete(key: string) {
    return this.store.delete(key)
  }
}
