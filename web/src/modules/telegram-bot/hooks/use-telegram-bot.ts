import { useQuery }
from '@tanstack/react-query'

import {
  getTelegramBot
} from '../api/telegram-bot.api'

export function useTelegramBot(
  id: string
) {

  return useQuery({

    queryKey: [
      'telegram-bot',
      id
    ],

    queryFn: () =>
      getTelegramBot(id),

    enabled: !!id
  })
}