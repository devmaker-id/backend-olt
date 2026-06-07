import {
  useMutation
} from '@tanstack/react-query'

import {
  connectOlt
} from '../api/olt.api'

export function useConnectOlt() {

  return useMutation({

    mutationFn:
      connectOlt
  })
}