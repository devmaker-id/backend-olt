import { TelegramService } from '../telegram.service'

export async function
handleHelpCommand(
  body: any,
  role: String
) {

  const chatId = body.message.chat.id
  const messageId = body.message.message_id

  let message = ''
  message += `📡 <b>BIBITNET NOC BOT</b>\n`
  message += `━━━━━━━━━━━━━━\n`
  message += `🔍 <b>/inet [nomor]</b>\nCek detail internet pelanggan\nContoh:\n<code>/inet 1998250526001</code>\n━━━━━━━━━━━━━━\n`
  message += `📡 <b>/signal [nomor]</b>\nCek cepat redaman\nContoh:\n<code>/signal 1998250526001</code>\n━━━━━━━━━━━━━━\n`
  message += `🚨 <b>/onu-offline</b>\nLihat daftar ONU offline\n━━━━━━━━━━━━━━\n`

  if(role === 'ADMIN') {
    message += `\n━━━━━━━━━━━━━━\n`
    message += `ADMIN CONSOLE\n`
    message += `━━━━━━━━━━━━━━\n`
    message += `🔍 <b>/authorize [mac-onu]</b>\nAuthorize router onu\nKirim /cancel untuk membatalkan\n━━━━━━━━━━━━━━\n`
  }

  await TelegramService.sendMessage({
    chatId,
    replyToMessageId: messageId,
    text: message
  })
}