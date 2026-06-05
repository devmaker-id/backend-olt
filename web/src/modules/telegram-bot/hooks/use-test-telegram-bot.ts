import { useMutation }
from '@tanstack/react-query'

import {
  testTelegramBot
} from '../api/telegram-bot.api'

export function
useTestTelegramBot() {

  return useMutation({

    mutationFn:
      testTelegramBot
  })
}