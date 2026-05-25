export function classifyRxPower(
  rxPower?: string | null
) {

  if (!rxPower) {
    return 'UNKNOWN'
  }

  const value =
    parseFloat(rxPower)

  if (isNaN(value)) {
    return 'UNKNOWN'
  }

  if (value > -20) {
    return 'GOOD'
  }

  if (value > -24) {
    return 'FAIR'
  }

  if (value > -27) {
    return 'LOW'
  }

  return 'CRITICAL'
}