import { Badge } from '@/components/ui/badge'

interface Props {
  vendor: string
}

export function OltVendorBadge({
  vendor,
}: Props) {
  return (
    <Badge variant="outline">
      {vendor}
    </Badge>
  )
}