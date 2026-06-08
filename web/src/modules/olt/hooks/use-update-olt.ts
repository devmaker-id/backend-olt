import { useMutation }
from '@tanstack/react-query'

import {
  updateOlt
} from '../api/olt.api'

export function useUpdateOlt() {

  return useMutation({

    mutationFn:
      ({
        id,
        data
      }: any) =>
        updateOlt(
          id,
          data
        )
  })
}