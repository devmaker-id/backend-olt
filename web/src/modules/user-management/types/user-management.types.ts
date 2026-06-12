export type UserRole =
  | 'OWNER'
  | 'TEKNISI'

export interface User {

  id: string

  username: string

  role: UserRole

  createdAt: string

  updatedAt: string

}

export interface CreateUserDto {

  username: string

  password: string

  role: UserRole

}

export interface UpdateUserDto {

  username?: string

  role?: UserRole

}