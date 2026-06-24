import {
  getEndpointByInet
} from '../../../modules/endpoint/endpoint.service'

import {
  TelegramService
} from '../telegram.service'

import {
  classifyRxPower,
  getSignalIcon
} from '../../../utils/classify-rx-power'

export async function handleSignalCommand(
  body: any
) {
  const chatId = body.message.chat.id
  const messageId = body.message.message_id
  const text = body.message.text
  const args = text.split(' ')
  const internetNo = args[1]

  if (!internetNo) {
    await TelegramService.sendMessage({
      chatId,
      replyToMessageId: messageId,
      text: `
⚠️ <b>Nomor internet wajib diisi</b>

Contoh:
<code>/signal 1998250526001</code>
`
    })
    return
  }

  const result = await getEndpointByInet(
    internetNo
  )

  if (!result) {
    await TelegramService.sendMessage({
      chatId,
      replyToMessageId: messageId,
      text: 'nomor internet ga ada'
    })
    return
  }

  const onus = result.onus ?? []

  let message = ''

  message += '📡 <b>SIGNAL STATUS</b>\n'
  message += '━━━━━━━━━━━━━━\n\n'

  message += `🆔 <code>${result.internetNo}</code>\n`
  message += `👤 ${result.name}\n\n`

  if (onus.length === 0) {
    message += '⚠️ Tidak memiliki ONU\n'

    await TelegramService.sendMessage({
      chatId,
      replyToMessageId: messageId,
      text: message
    })

    return
  }

  message += `📶 <b>ONU (${onus.length})</b>\n`
  message += '━━━━━━━━━━━━━━\n\n'

  for (const [index, onu] of onus.entries()) {
    const isOnline = onu.status === 'ONLINE'

    const signal = isOnline
      ? classifyRxPower(onu.rxPower)
      : 'OFFLINE'

    const signalIcon = getSignalIcon(signal)

    message += `📶 <b>ONU #${index + 1}</b>\n`
    message += `${isOnline ? '🟢' : '🔴'} STATUS: ${onu.status}\n`
    message += `${signalIcon} SIGNAL: ${signal}\n`

    message += `🛰 OLT: ${onu.olt?.name ?? '-'}\n`
    message += `🔌 PORT: ${onu.port ?? '-'}\n`

    if (isOnline) {
      message += `📥 RX POWER: ${onu.rxPower ?? '-'}\n`
      message += `📤 TX POWER: ${onu.txPower ?? '-'}\n`
      message += `🌡 TEMPERATURE: ${onu.temperature ?? '-'}\n`
    } else {
      message += '📥 RX POWER: -\n'
      message += '📤 TX POWER: -\n'
      message += '🌡 TEMPERATURE: -\n'
    }

    message += '\n━━━━━━━━━━━━━━\n\n'
  }

  await TelegramService.sendMessage({
    chatId,
    replyToMessageId: messageId,
    text: message
  })
}