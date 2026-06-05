import { useMutation }
from '@tanstack/react-query'

import {
  createTelegramBot
} from '../api/telegram-bot.api'

export function
useCreateTelegramBot() {

  return useMutation({

    mutationFn:
      createTelegramBot
  })
}