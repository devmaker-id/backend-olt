import { useMutation }
from '@tanstack/react-query'

import {
  deleteTelegramBot
} from '../api/telegram-bot.api'

export function
useDeleteTelegramBot() {

  return useMutation({

    mutationFn:
      deleteTelegramBot
  })
}