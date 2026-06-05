import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'

import {
  createTelegramUser
} from '../api/telegram.api'

export function useCreateTelegramUser() {

  const queryClient =
    useQueryClient()

  return useMutation({

    mutationFn:
      createTelegramUser,

    onSuccess() {

      queryClient.invalidateQueries({
        queryKey: [
          'telegram-users'
        ]
      })
    }
  })
}