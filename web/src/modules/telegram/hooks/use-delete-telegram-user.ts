import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'

import {
  deleteTelegramUser
} from '../api/telegram.api'

export function useDeleteTelegramUser() {

  const queryClient =
    useQueryClient()

  return useMutation({

    mutationFn:
      deleteTelegramUser,

    onSuccess() {

      queryClient.invalidateQueries({
        queryKey: [
          'telegram-users'
        ]
      })
    }
  })
}