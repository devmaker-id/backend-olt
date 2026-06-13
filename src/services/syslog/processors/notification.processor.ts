import { TelegramService } from '../../telegram/telegram.service'

export class NotificationProcessor {

  static async send(
    chatId: string,
    text: string
  ) {

    return TelegramService.sendMessage({
      chatId,
      text
    })

  }

}