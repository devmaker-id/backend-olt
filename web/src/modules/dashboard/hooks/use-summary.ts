import { useQuery } from '@tanstack/react-query'
import { getSummary } from '../api/dashboard.api'

export function useSummary() {

  return useQuery({
    queryKey: [
      'onu-summary'
    ],
    queryFn:
      getSummary
  })
}