import { TelegramService } from '../telegram.service'
import { TelegramSessionStore } from '../session/telegram.session'
import { validateUnauthorizedOnu } from '../../../modules/onu/onu.validation'

export async function handleAuthorizeCommand(
  body: any,
  role: String
) {
  const chatId = body.message.chat.id.toString()
  const messageId = body.message.message_id

  // cek role
  if (
    role !== 'ADMIN'
  ) {
    return TelegramService.sendMessage({
      chatId,
      replyToMessageId: messageId,
      text: '⛔ Command ini hanya untuk ADMIN'
    })
  }

  const args = body.message.text.split(' ')
  const macAddress = args[1]?.toUpperCase()


  if (!macAddress) {

    return TelegramService.sendMessage({
      chatId,
      replyToMessageId: messageId,
      text:
`
⚠️ Masukkan MAC ONU

Contoh:
<code>/authorize E4:A8:B6:D0:7E:F0</code>
`
    })
  }

  const validMac = /^([0-9A-F]{2}:){5}[0-9A-F]{2}$/.test(macAddress)
  if (!validMac) {
    return TelegramService.sendMessage({
      chatId,
      replyToMessageId: messageId,
      text: '❌ Format MAC tidak valid'
    })
  }

  // cek db
  const check = await validateUnauthorizedOnu( macAddress )
  if (!check.success) {
    let message = `❌ ${check.message}`
    return TelegramService.sendMessage({
      chatId,
      replyToMessageId: messageId,
      text: message
    })
  }


  TelegramSessionStore.set(
    chatId,
    {
      action: 'AUTHORIZE_ONU',
      step: 'NAME',
      data: {
        macAddress
      }
    }
  )


  return TelegramService.sendMessage({

    chatId,

    replyToMessageId:
      messageId,

    text:
      '👤 Masukkan nama pelanggan'
  })
}