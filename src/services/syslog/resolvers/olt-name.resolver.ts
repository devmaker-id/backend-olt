export class OltNameResolver {
  static resolve(log: string): string | null {
    const match = log.match(
      /^<\d+>[A-Z][a-z]{2}\s+\d+\s+\d+:\d+:\d+\s+([^:]+):/
    )

    return match?.[1].trim() ?? null
  }
}