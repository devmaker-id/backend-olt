import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import {
  resetUserPassword,
} from '../api/users.api'

export function
useResetUserPassword() {

  const queryClient =
    useQueryClient()

  return useMutation({

    mutationFn: ({
      id,
      password,
    }: {

      id: string

      password: string

    }) =>
      resetUserPassword(
        id,
        password,
      ),

    onSuccess() {

      queryClient
        .invalidateQueries({

          queryKey: [
            'users',
          ],

        })

    },

  })

}