import { Inbox } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
}

export function EmptyState({
  title = 'No data found',
  description = 'There is nothing to display.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Inbox className="text-muted-foreground mb-4 h-12 w-12" />

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="text-muted-foreground mt-2 text-sm">
        {description}
      </p>
    </div>
  )
}