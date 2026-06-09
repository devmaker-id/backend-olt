export interface TelegramAccessLog {
  id: string
  telegramId: string
  username: string
  firstName: string
  message: string
  chatType: string
  isAuthorized: boolean
  telegramBotId: string
  rawUpdate: unknown
  createdAt: string

  bot: {
    id: string
    telegramBotId: string
    name: string
    username: string
    description: string
    isActive: boolean
    createdAt: string
    updatedAt: string
  }
}