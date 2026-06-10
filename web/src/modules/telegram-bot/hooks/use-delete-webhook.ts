import { useMutation, useQueryClient }
from '@tanstack/react-query'

import {
  deleteWebhook
} from '../api/telegram-bot.api'
import { appToast } from '@/shared/lib/toast'

export function useDeleteWebhook() {
  const queryClient =
    useQueryClient()

  return useMutation({

    mutationFn: deleteWebhook,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [
          'telegram-bots',
        ],
      })
      appToast.success(
        'Webhook deleted',
      )
    }
  })
}