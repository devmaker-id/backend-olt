export interface TelegramBot {

  id: string

  telegramBotId: string

  name: string

  username: string

  token: string

  defaultChatId: string | null

  webhookUrl: string | null

  description: string | null

  isActive: boolean

  createdAt: string

  updatedAt: string
}

export interface CreateTelegramBotDto {

  name: string

  token: string

  defaultChatId?: string

  description?: string
}

export interface UpdateTelegramBotDto {

  name?: string

  defaultChatId?: string

  description?: string

  isActive?: boolean
}
export interface SetWebhookRequest {
  id: string

  url: string
}

export interface TestTelegramBotRequest {
  id: string

  chatId: string
}