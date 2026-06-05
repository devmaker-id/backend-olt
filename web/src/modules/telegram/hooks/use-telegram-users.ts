import { useQuery }
from '@tanstack/react-query'

import {
  getTelegramUsers
} from '../api/telegram.api'

export function useTelegramUsers() {

  return useQuery({
    queryKey: [
      'telegram-users'
    ],

    queryFn:
      getTelegramUsers
  })
}