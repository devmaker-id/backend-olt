import { useMutation }
from '@tanstack/react-query'

import {
  createOlt
} from '../api/olt.api'

export function useCreateOlt() {

  return useMutation({

    mutationFn:
      createOlt
  })
}