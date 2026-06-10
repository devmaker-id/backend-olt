import { useQuery }
from '@tanstack/react-query'

import {
  getEndpointById
} from '../api/endpoint.api'

export function
useEndpoint(
  id: string
) {

  return useQuery({

    queryKey: [
      'endpoint',
      id
    ],

    queryFn: () =>
      getEndpointById(
        id
      ),

    enabled:
      !!id
  })
}