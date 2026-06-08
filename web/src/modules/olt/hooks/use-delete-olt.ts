import { useMutation }
from '@tanstack/react-query'

import {
  deleteOlt
} from '../api/olt.api'

export function useDeleteOlt() {

  return useMutation({

    mutationFn:
      deleteOlt
  })
}