import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import {
  deleteTelegramBot,
} from '../api/telegram-bot.api'

import {
  appToast,
} from '@/shared/lib/toast'

export function useDeleteTelegramBot() {
  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn:
      deleteTelegramBot,

    onSuccess() {

      queryClient.invalidateQueries({
        queryKey: [
          'telegram-bots',
        ],
      })

      appToast.success(
        'Telegram bot deleted',
      )
    },

    onError(error) {

      appToast.error(
        error.message,
      )
    },
  })
}