import {
  Role,
} from '@prisma/client'

export interface UpdateUserDto {
  username?: string

  role?: Role
}