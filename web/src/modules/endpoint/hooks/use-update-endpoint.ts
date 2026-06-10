import { useMutation } from '@tanstack/react-query'
import { updateEndpoint } from '../api/endpoint.api'
import type { UpdateEndpointMutationDto } from '../types/endpoint.types'

export function useUpdateEndpoint() {
  return useMutation({
    mutationFn: (
        payload: UpdateEndpointMutationDto
    ) => updateEndpoint(
        payload.id,
        payload.data
    )
  })
}