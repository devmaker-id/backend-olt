import { Badge } from '@/components/ui/badge'

interface Props {
  isActive: boolean
}

export function TelegramBotStatusBadge({
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
          ? 'ACTIVE'
          : 'INACTIVE'
      }
    </Badge>
  )
}