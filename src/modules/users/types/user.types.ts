import {
  Role,
} from '@prisma/client'

export interface UserResponse {
  id: string

  username: string

  role: Role

  createdAt: Date

  updatedAt: Date
}