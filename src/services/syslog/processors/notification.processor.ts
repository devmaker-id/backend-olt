import { TelegramService } from '../../telegram/telegram.service'

export class NotificationProcessor {

  static async send(
    chatId: string,
    text: string,
    token?: string
  ) {

    return TelegramService.sendMessage({
      token,
      chatId,
      text
    })

  }

}