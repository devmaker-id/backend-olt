export interface ParsedOnu {
  port: string
  onuId: string
  macAddress: string
  status: string
}

export function parseOnuList(
  output: string
): ParsedOnu[] {

  const result: ParsedOnu[] = []

  output =
    output.replace(
      /\x1B\[[0-9;]*[A-Za-z]/g,
      ''
    )

  const lines = output.split('\n')

  for (const rawLine of lines) {

    const line =
      rawLine.trim()

    if (
      !line.match(
        /^\d+\/\d+:\d+/
      )
    ) {
      continue
    }

    const parts =
      line.split(/\s+/)

    if (
      parts.length < 12
    ) {
      continue
    }

    const onu = parts[0]

    const [
      port,
      onuId
    ] = onu.split(':')

    result.push({
      port,
      onuId,
      macAddress: parts[1],
      status: parts[2]
    })
  }

  return result
}