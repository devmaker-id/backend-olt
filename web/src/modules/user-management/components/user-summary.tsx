import {
  SummaryCard,
} from '@/shared/components/summary-card'

interface Props {

  total: number

}

export function UserSummary({
  total,
}: Props) {

  return (

    <div
      className="
        grid
        gap-4
        md:grid-cols-1
      "
    >

      <SummaryCard
        title="Users"
        value={total}
      />

    </div>

  )

}