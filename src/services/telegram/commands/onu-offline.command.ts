import { prisma } from '../../../config/prisma'

import { TelegramService } from '../telegram.service'

export async function
handleOnuOfflineCommand(
  body: any
) {
  const chatId = body.message.chat.id

  const messageId = body.message.message_id

  const onus =
    await prisma.onu.findMany({

      where: {

        connectionState: 'OFFLINE',

        isActive: true
      },

      include: {

        endpoint: true,

        olt: true
      },

      orderBy: {
        updatedAt: 'desc'
      }
    })

  if (!onus.length) {

    await TelegramService.sendMessage({
      chatId,
      text: '✅ Semua ONU online',
      replyToMessageId: messageId
    })

    return
  }

  let message ='🚨 <b>ONU OFFLINE</b>\n'
  message += `===============\n`
  onus.forEach( (onu, index) => {
      message +=
`[${index + 1}]
👤 : ${onu.endpoint?.name || '-'}
🏠 : ${onu.endpoint?.address || '-'}
🆔 : <code>${onu.endpoint?.internetNo || '-'}</code>
🛰 : ${onu.olt?.name || '-'}
🔌 : ${onu.eponPort}:${onu.onuId}
===============\n
`})

  await TelegramService.sendMessage({
    chatId,
    replyToMessageId: messageId,
    text: message
  })
}