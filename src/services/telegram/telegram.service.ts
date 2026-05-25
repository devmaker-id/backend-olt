import { env }
  from '../../config/env'

export class TelegramService {

  static async sendMessage(
    text: string
  ) {

    try {

      const response =
        await fetch(
          `https://api.telegram.org/bot${env.telegramBotToken}/sendMessage`,
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json'
            },

            body: JSON.stringify({
              chat_id: env.telegramChatId,
              text,
              parse_mode: "HTML",
            })
          }
        )

      if (!response.ok) {
        const error = await response.text()
        console.log('TELEGRAM SEND FAILED')
        console.log(error)
        return
      }

      const result = await response.json()
      console.log('TELEGRAM SENT')


    }

    catch (error) {

      console.error(
        'TELEGRAM ERROR',
        error
      )
    }
  }
}