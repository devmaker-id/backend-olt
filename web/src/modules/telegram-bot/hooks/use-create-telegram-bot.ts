import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import {
  createTelegramBot,
} from '../api/telegram-bot.api'

import {
  appToast,
} from '@/shared/lib/toast'

export function useCreateTelegramBot() {
  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn:
      createTelegramBot,

    onSuccess() {

      queryClient.invalidateQueries({
        queryKey: [
          'telegram-bots',
        ],
      })

      appToast.success(
        'Telegram bot created',
      )
    },

    onError(error) {

      appToast.error(
        error.message,
      )
    },
  })
}