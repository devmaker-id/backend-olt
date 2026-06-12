import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import {
  updateUser,
} from '../api/users.api'

export function useUpdateUser() {

  const queryClient =
    useQueryClient()

  return useMutation({

    mutationFn: ({
      id,
      data,
    }: any) =>
      updateUser(
        id,
        data,
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