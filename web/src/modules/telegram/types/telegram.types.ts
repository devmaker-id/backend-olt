export interface TelegramUser {
  id: string

  telegramId: string

  name: string

  role: string

  isActive: boolean

  createdAt: string
}

export interface CreateTelegramUserRequest {
  telegramId: string

  name: string

  role: string
}