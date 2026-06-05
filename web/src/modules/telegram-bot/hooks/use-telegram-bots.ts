import { useQuery }
from '@tanstack/react-query'

import {
  getTelegramBots
} from '../api/telegram-bot.api'

export function useTelegramBots() {

  return useQuery({

    queryKey: [
      'telegram-bots'
    ],

    queryFn:
      getTelegramBots
  })
}