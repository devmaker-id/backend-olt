import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import {
  deleteTelegramAccessLog,
} from '../api/telegram-access-log.api'

export function
useDeleteTelegramAccessLog() {
  const queryClient = useQueryClient()
  return useMutation({

    mutationFn:
      deleteTelegramAccessLog,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          'telegram-access-logs'
        ]
      })
    }

  })
}