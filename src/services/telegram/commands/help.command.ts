import { TelegramService } from '../telegram.service'

export async function
handleHelpCommand(
  body: any
) {

  const chatId = body.message.chat.id
  const messageId = body.message.message_id
  await TelegramService.sendMessage({
    chatId,
    replyToMessageId: messageId,
    text:
`
📡 <b>BIBITNET NOC BOT</b>
━━━━━━━━━━━━━━
🔍 <b>/inet [nomor]</b>
Cek detail internet pelanggan
Contoh:
<code>/inet 1998250526001</code>
━━━━━━━━━━━━━━
🚨 <b>/onu-offline</b>
Lihat daftar ONU offline
━━━━━━━━━━━━━━
`
  })
}