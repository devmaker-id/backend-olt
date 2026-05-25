import { env } from '../../config/env'
import { TelegramMessage } from './telegram.types'

export class TelegramService {
  static async sendMessage( message: TelegramMessage ) {
    try {
      const response = await fetch(`https://api.telegram.org/bot${env.telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type':
          'application/json'
        },
        body: JSON.stringify({
          chat_id: message.chatId,
          text: message.text,
          parse_mode: 'HTML',
          reply_to_message_id: message.replyToMessageId
        })
      })
      if (!response.ok) {
        const error = await response.text()
        console.log( 'TELEGRAM SEND FAILED' )
        console.log(error)
        return null
      }
      console.log( 'TELEGRAM SENT' )
      return await response.json()
    }
    catch(error) { 
      console.log( 'TELEGRAM ERROR' )
      console.log(error)
      return null
    }
  }
}