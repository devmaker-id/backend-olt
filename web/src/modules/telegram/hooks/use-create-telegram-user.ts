import { appToast } from '@/shared/lib/toast'
import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'

import {
  createTelegramUser
} from '../api/telegram.api'

export function useCreateTelegramUser() {

  const queryClient =
    useQueryClient()

  return useMutation({

    mutationFn:
      createTelegramUser,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [
          'telegram-users'
        ]
      })
      appToast.success(
        'Create Success',
        {
          description: 'User can now access the bot'
        },
      )
    },
    onError(error) {
      appToast.error(
        'Telegram User FAILED',
        {
          description: error.message ?? 'Gagal membuat telegram user'
        },
      )
    }
  })
}