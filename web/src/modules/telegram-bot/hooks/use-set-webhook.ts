import { useMutation }
from '@tanstack/react-query'

import {
  setWebhook
} from '../api/telegram-bot.api'

export function
useSetWebhook() {

  return useMutation({

    mutationFn:
      ({
        id,
        url
      }: any) =>
        setWebhook(
          id,
          url
        )
  })
}