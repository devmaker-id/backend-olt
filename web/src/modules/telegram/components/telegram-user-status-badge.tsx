import { Badge } from '@/components/ui/badge'

interface Props {
  isActive: boolean
}

export function TelegramUserStatusBadge({
  isActive,
}: Props) {
  return (
    <Badge
      variant={
        isActive
          ? 'default'
          : 'destructive'
      }
    >
      {
        isActive
          ? 'Active'
          : 'Inactive'
      }
    </Badge>
  )
}