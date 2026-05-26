import {
  TelegramRole
} from '@prisma/client'

export interface CreateTelegramUserDto {

  telegramId: string

  username?: string

  fullName?: string

  role?: TelegramRole
}

export interface UpdateTelegramUserDto {

  username?: string

  fullName?: string

  role?: TelegramRole

  isActive?: boolean
}

export interface TelegramUserParams {

  id: string
}