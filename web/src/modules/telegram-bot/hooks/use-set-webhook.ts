import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import {
  setWebhook,
} from '../api/telegram-bot.api'

import {
  appToast,
} from '@/shared/lib/toast'

interface SetWebhookPayload {
  id: string

  url: string
}

export function useSetWebhook() {
  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      url,
    }: SetWebhookPayload) =>
      setWebhook(
        id,
        url,
      ),

    onSuccess() {

      queryClient.invalidateQueries({
        queryKey: [
          'telegram-bots',
        ],
      })

      appToast.success(
        'Webhook configured',
      )
    },

    onError(error) {

      appToast.error(
        error.message,
      )
    },
  })
}