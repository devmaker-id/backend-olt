import { useQuery }
from '@tanstack/react-query'

import {
  getEndpoints
} from '../api/endpoint.api'

export function
useEndpoints() {

  return useQuery({

    queryKey: [
      'endpoints'
    ],

    queryFn:
      getEndpoints
  })
}