export type SignalStatus = | 'GOOD' | 'FAIR' | 'LOW' | 'CRITICAL' | 'OFFLINE' | 'UNKNOWN'

export function classifyRxPower(
  rxPower?: string | null
) {

  if ( rxPower === null || rxPower === undefined ) {
    return 'OFFLINE'
  }

  const value = parseFloat( rxPower )

  if ( isNaN(value) ) {
    return 'UNKNOWN'
  }


  if (
    value > -20
  ) {

    return 'GOOD'
  }


  if (
    value > -24
  ) {

    return 'FAIR'
  }


  if (
    value > -27
  ) {

    return 'LOW'
  }


  return 'CRITICAL'
}

export function getSignalIcon(
  status: SignalStatus
) {
  return {
    GOOD: '🟢',
    FAIR: '🟡',
    LOW: '🟠',
    CRITICAL: '🔴',
    OFFLINE: '🔴',
    UNKNOWN: '⚪'
  }[ status ]
}