import { Badge } from '@/components/ui/badge'

interface AccessLogStatusBadgeProps {
  isAuthorized: boolean
}

export function AccessLogStatusBadge({
  isAuthorized,
}: AccessLogStatusBadgeProps) {
  if (isAuthorized) {
    return (
      <Badge>
        Authorized
      </Badge>
    )
  }

  return (
    <Badge variant="destructive">
      Unauthorized
    </Badge>
  )
}