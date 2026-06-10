import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import {
  updateTelegramUser,
} from '../api/telegram.api'

import type {
  UpdateTelegramUserRequest,
} from '../types/telegram.types'
import { appToast } from '@/shared/lib/toast'

interface UpdateTelegramUserPayload {
  id: string

  payload: UpdateTelegramUserRequest
}

export function useUpdateTelegramUser() {
  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: UpdateTelegramUserPayload) =>
      updateTelegramUser(
        id,
        payload,
      ),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [
          'telegram-users',
        ],
      })
      appToast.success(
        'Berhasil update telegram user'
      )
    },
    onError(error) {
      appToast.error(
        error.message ??
        'Failed to update telegram user'
      )
    }
  })
}