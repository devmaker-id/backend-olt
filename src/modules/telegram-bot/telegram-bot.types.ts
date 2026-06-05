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