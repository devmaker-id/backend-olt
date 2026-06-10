import { useMutation }
from '@tanstack/react-query'

import {
  createEndpoint
} from '../api/endpoint.api'

export function
useCreateEndpoint() {

  return useMutation({

    mutationFn:
      createEndpoint
  })
}