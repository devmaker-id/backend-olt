import {
  useMutation,
  useQueryClient
} from '@tanstack/react-query'

import { toast }
from 'sonner'

import {
  deleteEndpoint
} from '../api/endpoint.api'

import type {
  DeleteEndpointMutationDto
} from '../types/endpoint.types'

export function useDeleteEndpoint() {

  const queryClient =
    useQueryClient()

  return useMutation({

    mutationFn: (
      payload:
        DeleteEndpointMutationDto
    ) =>
      deleteEndpoint(
        payload.id
      ),

    onSuccess: async () => {

      await queryClient.invalidateQueries({

        queryKey: [
          'endpoints'
        ]
      })

      toast.success(
        'Endpoint deleted successfully'
      )
    },

    onError: (
      error: any
    ) => {

      toast.error(

        error?.response?.data?.message

        ||

        'Failed to delete endpoint'
      )
    }
  })
}