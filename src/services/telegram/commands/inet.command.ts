import {
  getEndpointByInet
} from '../../../modules/endpoint/endpoint.service'

import {
  TelegramService
} from '../telegram.service'

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

  if (!result.success) { 
    await TelegramService.sendMessage({
      chatId,
      text: result.message!
  })
    return
  }

    const data =
  result.data!

let message = ''

message +=
'📡 <b>INTERNET DETAIL</b>\n'

message +=
'━━━━━━━━━━━━━━\n\n'

message +=
'👤 <b>Customer Information</b>\n'

message +=
`🆔 ID: <code>${data.internetNo}</code>\n`

message +=
`👤 SITE: ${data.name}\n`

message +=
`📍 TYPE: ${data.type}\n`

message +=
`🏠 ADDRESS: ${data.address ?? '-'}\n\n`

message +=
'📶 <b>ONU Information</b>\n'

message +=
`🟢 STATUS: ${data.onu.status}\n`

message +=
`📊 SIGNAL: ${data.onu.signalStatus}\n`

message +=
`📶 ONU: ${data.onu.name}\n`

message +=
`💻 MODEL: ${data.onu.model}\n`

message +=
`🔌 PORT: ${data.onu.port}\n`

message +=
`🛰 OLT: ${data.olt.name}\n\n`

message +=
'💡 <b>Optical Information</b>\n'

message +=
`📥 RX POWER: ${data.onu.rxPower}\n`

message +=
`📤 TX POWER: ${data.onu.txPower}\n`

message +=
`🌡 TEMP: ${data.onu.temperature}\n`

message +=
`🔄 OFFLINE COUNT: ${data.onu.offlineCount}\n\n`

message +=
'⏱ <b>ONU History</b>\n'

message +=
`🟢 FIRST ONLINE:\n${data.onu.firstUptime}\n\n`

message +=
`🔴 LAST OFFLINE:\n${data.onu.lastOfftime}\n`

    await TelegramService.sendMessage({
      chatId,
      text: message,
      replyToMessageId: messageId
    })

}