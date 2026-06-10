export type TelegramRole =
  | 'ADMIN'
  | 'TEKNISI'

export interface TelegramUser {
  id: string
  telegramId: string
  username: string
  fullName: string
  role: TelegramRole
  isActive: boolean
  createdAt: string
}

export interface CreateTelegramUserRequest {
  telegramId: string
  username: string
  fullName: string
  role: TelegramRole
}
export interface UpdateTelegramUserRequest {
  telegramId: string
  username: string
  fullName: string
  role: TelegramRole
  isActive: boolean
}