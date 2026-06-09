import { useQuery }
from '@tanstack/react-query'

import {
  getTelegramAccessLogs
} from '../api/telegram-access-log.api'

export function
useTelegramAccessLogs() {

  return useQuery({

    queryKey: [
      'telegram-access-logs'
    ],

    queryFn:
      getTelegramAccessLogs

  })
}