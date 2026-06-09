import { Badge } from '@/components/ui/badge'

interface Props {
  status: string
}

export function OpticalStatusBadge({
  status,
}: Props) {
  const online =
    status === 'ONLINE'

  return (
    <Badge
      variant={
        online
          ? 'default'
          : 'destructive'
      }
    >
      {status}
    </Badge>
  )
}