import { Card, CardContent } from '@/components/ui/card'
import type { ReactNode } from 'react'

interface SummaryCardProps {
  title: string
  value: number
  icon?: ReactNode
}

export function SummaryCard({
  title,
  value,
  icon
}: SummaryCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          {icon}
        </div>

        <div className="mt-2 text-3xl font-bold">
          {value}
        </div>
      </CardContent>
    </Card>
  )
}