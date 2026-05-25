export class EventCooldown {
  private static cache = new Map<string, number>()
  static isBlocked( key: string, cooldownMs = 30000 ) {
    const now = Date.now()
    const last = this.cache.get(key)
    if ( last && now - last < cooldownMs ) {
      return true
    }
    this.cache.set( key, now )
    return false
  }
}