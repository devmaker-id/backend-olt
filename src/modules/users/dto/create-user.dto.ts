import {
  Role,
} from '@prisma/client'

export interface CreateUserDto {
  username: string

  password: string

  role?: Role
}