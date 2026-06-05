import { useMutation } from '@tanstack/react-query'
import { authorizeOnu } from '../api/onu.api'

export function useAuthorizeOnu() {

  return useMutation({
    mutationFn:
      authorizeOnu
  })
}