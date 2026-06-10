import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'

import {
  deleteTelegramUser
} from '../api/telegram.api'
import { appToast } from '@/shared/lib/toast'

export function useDeleteTelegramUser() {

  const queryClient =
    useQueryClient()

  return useMutation({

    mutationFn:
      deleteTelegramUser,

    onSuccess() {

      queryClient.invalidateQueries({
        queryKey: [
          'telegram-users'
        ]
      })
      appToast.success(
        'Telegram user berhasil di hapus'
      )
    },
    onError(error) {
      appToast.error(
        error.message ??
        'Failed to delete telegram user'
      )
    }
  })
}