import { getEndpointByInet } from '../../../modules/endpoint/endpoint.service'
import {
  classifyRxPower,
  getSignalIcon
} from '../../../utils/classify-rx-power'
import { TelegramService } from '../telegram.service'

export async function
handleInetCommand(
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
      text: `Nomor internet wajib diisi\n Contoh:\n /inet 1998250526001`,
      replyToMessageId: messageId
    })

    return
  }

  const result = await getEndpointByInet( internetNo )

  if (!result) { 
    await TelegramService.sendMessage({
      chatId,
      text: 'Nomor internet ga ditemukan'
  })
    return
  }

  const endpoint = {
    type: result.type,
    internetNo: result.internetNo,
    name: result.name,
    telepon: result.telepon,
    email: result.email,
    address: result.address,
  }

  let message = ''
  message += '📡 <b>INTERNET DETAIL</b>\n'
  message += '━━━━━━━━━━━━━━\n\n'
  message += '👤 <b>Endpoint Information</b>\n'
  message += `🆔 ID: <code>${endpoint.internetNo}</code>\n`
  message += `👤 SITE: ${escapeHtml(endpoint.name)}\n`
  message += `📍 TYPE: ${endpoint.type}\n`
  message += `📍 TELEPON: ${endpoint.telepon || '-'}\n`
  message += `📍 EMAIL: ${endpoint.email || '-'}\n`
  message += `🏠 ADDRESS: ${endpoint.address ?? '-'}\n\n`

  const onus = result.onus ?? []

  if(onus.length === 0){
    message += '📶 ONU: TIDAK MEMILIKI ONU \n\n'
    await TelegramService.sendMessage({
      chatId,
      text: message,
      replyToMessageId: messageId
    })
    return
  }

  message += `📶 <b>ONU Information (${result.onuCount})</b>\n`
  message += '━━━━━━━━━━━━━━\n\n'

  for(const [index, onu] of onus.entries()) {
    const isOnline = onu.status === 'ONLINE'
    const signal = isOnline ? classifyRxPower(onu.rxPower) : 'OFFLINE'

    const signalIcon = getSignalIcon(signal)
    
    message += `📶 <b>ONU #${index + 1}</b>\n`
    message += `${signalIcon} <b>${onu.name}</b>\n`
    message += `📊 STATUS: ${onu.status}\n`
    message += `📈 SIGNAL: ${onu.signalStatus ?? '-'}\n`
    message += `💻 MODEL: ${onu.model ?? '-'}\n`
    message += `🔌 PORT: ${onu.port ?? '-'}\n`

    if (onu.olt) {
      message += `🛰 OLT: ${onu.olt.name}\n`
    }

    message += '\n💡 <b>Optical Information</b>\n'

    if (isOnline) {
      message += `📥 RX POWER: ${onu.rxPower ?? '-'}\n`
      message += `📤 TX POWER: ${onu.txPower ?? '-'}\n`
      message += `🌡 TEMP: ${onu.temperature ?? '-'}\n`
    } else {
      message += '🔴 ONU OFFLINE\n'
      message += '📥 RX POWER: -\n'
      message += '📤 TX POWER: -\n'
      message += '🌡 TEMP: -\n'
    }

    message += `🔄 OFFLINE COUNT: ${onu.offlineCount ?? 0}\n\n`

    message += '⏱ <b>ONU History</b>\n'
    message += `🟢 FIRST ONLINE:\n${onu.firstUptime ?? '-'}\n\n`
    message += `🔴 LAST OFFLINE:\n${onu.lastOfftime ?? '-'}\n`

    message += '\n━━━━━━━━━━━━━━\n\n'
  }
    await TelegramService.sendMessage({
      chatId,
      text: message,
      replyToMessageId: messageId
    })

}

function escapeHtml(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}