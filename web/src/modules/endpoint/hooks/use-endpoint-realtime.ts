import { useMutation }
from '@tanstack/react-query'

import {
  getRealtimeEndpoint
} from '../api/endpoint.api'

export function useEndpointRealtime() {

  return useMutation({
    mutationFn:
      getRealtimeEndpoint
  })
}