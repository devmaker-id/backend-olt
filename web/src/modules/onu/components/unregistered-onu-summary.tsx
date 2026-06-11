import {
  SummaryCard,
} from '@/shared/components/summary-card'

interface Props {
  total: number
}

export function UnregisteredOnuSummary({
  total,
}: Props) {

  return (
    <div className="grid gap-4 md:grid-cols-1">

      <SummaryCard
        title="Unauthorized ONU"
        value={total}
      />

    </div>
  )
}