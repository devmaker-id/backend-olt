import {
  Role,
} from '@prisma/client'

export interface UpdateUserDto {
  username?: string
  role?: Role
  email?: string
  telepon?: string
  alamat?: string
  telegramId?: string
}