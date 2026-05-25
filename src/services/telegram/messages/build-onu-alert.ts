export function
buildOnuAlertMessage(
  status: 'ONLINE' | 'OFFLINE',
  data: {
    name?: string
    internetNo?: string
    address?: string
    oltName: string
    port: string
    rxPower?: string
    signalStatus?: string
  }
) {

  let message = ''
  message +=
status === 'ONLINE'
? '🟢 <b>ONU ONLINE</b>\n\n'
: '🔴 <b>ONU OFFLINE</b>\n\n'
  message +=
`👤 ${data.name ?? '-'}\n`
  message +=
`🆔 <code>${data.internetNo ?? '-'}</code>\n\n`
  if (data.signalStatus) {
    message +=
`📊 SIGNAL: ${data.signalStatus}\n`
  }
  if (data.rxPower) {
    message +=
`📥 RX: ${data.rxPower}\n\n`
  }
  message +=
`🛰 ${data.oltName}\n`
  message +=
`🔌 ${data.port}\n\n`
  message +=
`🏠 ${data.address ?? '-'}\n`
  return message
}