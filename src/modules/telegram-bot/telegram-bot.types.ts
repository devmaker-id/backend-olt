export interface CreateTelegramBotDto {
  telegramBotId?: string
  name: string
  username?: string
  token: string
  webhookUrl?: string
  defaultChatId?: string
  description?: string
}

export interface UpdateTelegramBotDto {
  telegramBotId?: string
  name?: string
  username?: string
  token?: string
  webhookUrl?: string
  defaultChatId?: string
  description?: string
  isActive?: boolean
}

export interface TelegramWebhookDto {
  update_id: number
  message?: {
    message_id: number
    from?: {
      id: number
      is_bot: boolean
      first_name?: string
      username?: string
      language_code?: string
    }
    chat?: {
      id: number
      first_name?: string
      username?: string
      type?: string
    }
    date: number
    text?: string
  }
}