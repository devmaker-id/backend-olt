import { useMutation } from '@tanstack/react-query'
import { replaceOnu } from '../api/onu-replacement.api'

export function useReplaceOnu() {

  return useMutation({

    mutationFn:
      replaceOnu
  })
}