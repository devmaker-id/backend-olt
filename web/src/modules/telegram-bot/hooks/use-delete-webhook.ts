import { useMutation }
from '@tanstack/react-query'

import {
  deleteWebhook
} from '../api/telegram-bot.api'

export function
useDeleteWebhook() {

  return useMutation({

    mutationFn:
      deleteWebhook
  })
}