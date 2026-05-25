import {
  getEndpointByInet
} from '../../../modules/endpoint/endpoint.service'

import {
  TelegramService
} from '../telegram.service'

export async function
handleSignalCommand(
  body: any
) {

  const chatId =
    body.message.chat.id

  const messageId =
    body.message.message_id

  const text =
    body.message.text

  const args =
    text.split(' ')

  const internetNo =
    args[1]

  if (!internetNo) {

    await TelegramService.sendMessage({

      chatId,

      replyToMessageId:
        messageId,

      text:
`
⚠️ <b>Nomor internet wajib diisi</b>

Contoh:
<code>/signal 1998250526001</code>
`
    })

    return
  }

  const result =
    await getEndpointByInet(
      internetNo
    )

  if (!result.success) {

    await TelegramService.sendMessage({

      chatId,

      replyToMessageId:
        messageId,

      text:
        result.message!
    })

    return
  }

  const data =
    result.data!

  let message = ''

  message +=
'📡 <b>SIGNAL STATUS</b>\n'

  message +=
'━━━━━━━━━━━━━━\n\n'

  message +=
`🆔 <code>${data.internetNo}</code>\n`
  message +=
`👤 ${data.name}\n\n`

  message +=
`🟢 STATUS: ${data.onu.status}\n`
  message +=
`📊 SIGNAL: ${data.onu.signalStatus}\n\n`

  message +=
`🛰 OLT: ${data.olt.name}\n`
  message +=
`🔌 PORT: ${data.onu.port}\n\n`

  message +=
`📥 RX POWER: ${data.onu.rxPower}\n`
  message +=
`📤 TX POWER: ${data.onu.txPower}\n`
  message +=
`🌡 TEMPERATURE: ${data.onu.temperature}\n`

  await TelegramService.sendMessage({

    chatId,

    replyToMessageId:
      messageId,

    text:
      message
  })
}