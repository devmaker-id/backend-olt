import { useMutation }
from '@tanstack/react-query'

import {
  updateTelegramBot
} from '../api/telegram-bot.api'

export function
useUpdateTelegramBot() {

  return useMutation({

    mutationFn:
      ({
        id,
        data
      }: any) =>
        updateTelegramBot(
          id,
          data
        )
  })
}