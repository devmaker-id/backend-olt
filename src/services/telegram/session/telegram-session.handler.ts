import { EndpointType } from '@prisma/client'
import {
  TelegramService
} from '../telegram.service'

import {
  TelegramSessionStore
} from './telegram.session'

import {
  authorizeOnu
} from '../../../modules/onu/onu.service'


export async function handleSession(
  body: any,
  session: any
) {
  const chatId = body.message.chat.id.toString()
  const messageId = body.message.message_id
  const text = body.message.text


  // CANCEL

  if (
    text === '/cancel'
  ) {

    TelegramSessionStore.delete(
      chatId
    )


    return TelegramService.sendMessage({
      chatId,
      replyToMessageId: messageId,
      text: '❌ Proses dibatalkan'
    })
  }


  // STEP NAMA

  if (
    session.step === 'NAME'
  ) {
    session.data.name = text
    session.step = 'ADDRESS'
    TelegramSessionStore.set(
      chatId,
      session
    )

    return TelegramService.sendMessage({
      chatId,
      text: '📍 Masukkan alamat'
    })
  }



  // STEP ALAMAT

  if (
    session.step === 'ADDRESS'
  ) {
    session.data.address = text
    session.step = 'TYPE'
    TelegramSessionStore.set(
      chatId,
      session
    )


    return TelegramService.sendMessage({
      chatId,
      text:
`
Pilih tipe endpoint:

CUSTOMER
RESELLER
POP
BACKHAUL
`
    })
  }



  // STEP TYPE

  if (
    session.step === 'TYPE'
  ) {
    const endpointType = text.toUpperCase()
    if(!Object.values(
        EndpointType
    ).includes(
        endpointType as EndpointType
    )) {
        return TelegramService.sendMessage({
      chatId,
      text:
`
❌ Type tidak valid

Pilih:

CUSTOMER
RESELLER
POP
BACKHAUL
`
        })
    }

    session.data.type = endpointType as EndpointType
    session.step = 'CONFIRM'


    TelegramSessionStore.set(
      chatId,
      session
    )


    return TelegramService.sendMessage({

      chatId,

      text:
`
⚠️ Konfirmasi data
MAC: ${session.data.macAddress}
Nama: ${session.data.name}
Alamat: ${session.data.address}
Type: ${session.data.type}

Ketik:
/yes untuk simpan
/cancel batal
`
    })
  }



  // CONFIRM

  if ( session.step === 'CONFIRM' ) {
    if ( text !== '/yes' ) {
      return
    }
    const loading = await TelegramService.sendMessage({
        chatId,
        text:`⏳ <b>AUTHORIZE ONU</b>\nSedang konfigurasi OLT...\nMohon tunggu\n\nJangan kirim apapun selama aku prosess..`
    })

    const result = {
      success: true,
      message: "development",
      data: {
        internetNo: 1234567890,
        name: session.data.name,
        port: session.data.port
      }
    }
    TelegramSessionStore.delete(
      chatId
    )

    let message = `${result.success ? '✅' : '❌'} ${result.message}\n`
    message += `🆔 INTERNET: <code>${result.data?.internetNo ?? '-'}</code>\n`
    message += `👤 NAME: ${result.data?.name ?? '-'}\n`
    message += `📡 ONU: ${result.data?.port ?? '-'}\n`

    return TelegramService.editMessage({
        chatId,
        messageId: loading.result.message_id,
        text: message
    })
  }
}