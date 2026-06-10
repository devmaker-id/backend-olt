import { api }
from '../../../shared/lib/api'
import type {
  TelegramUser,
  CreateTelegramUserRequest,
  UpdateTelegramUserRequest
} from '../types/telegram.types'

export async function getTelegramUsers() {

  const response =
    await api.get<TelegramUser[]>(
      '/telegram/users'
    )

  return response.data
}

export async function createTelegramUser(
  payload: CreateTelegramUserRequest
) {

  const response =
    await api.post(
      '/telegram/users',
      payload
    )

  return response.data
}

export async function updateTelegramUser(
  id: string,
  payload: UpdateTelegramUserRequest,
) {
  const response =
    await api.patch(
      `/telegram/users/${id}`,
      payload,
    )

  return response.data
}

export async function deleteTelegramUser(
  id: string
) {

  const response =
    await api.delete(
      `/telegram/users/${id}`
    )

  return response.data
}