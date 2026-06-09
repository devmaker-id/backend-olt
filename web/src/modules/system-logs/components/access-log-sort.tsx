import { Button } from '@/components/ui/button'

interface AccessLogSortProps {
  order: 'asc' | 'desc'
  onChange: (
    order: 'asc' | 'desc'
  ) => void
}

export function AccessLogSort({
  order,
  onChange,
}: AccessLogSortProps) {
  return (
    <Button
      variant="outline"
      onClick={() =>
        onChange(
          order === 'asc'
            ? 'desc'
            : 'asc'
        )
      }
    >
      {order === 'asc'
        ? 'Oldest First'
        : 'Newest First'}
    </Button>
  )
}