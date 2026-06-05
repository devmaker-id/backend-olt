import { useMutation }
from '@tanstack/react-query'

import {
  getWebhookInfo
} from '../api/telegram-bot.api'

export function
useWebhookInfo() {

  return useMutation({

    mutationFn:
      getWebhookInfo
  })
}