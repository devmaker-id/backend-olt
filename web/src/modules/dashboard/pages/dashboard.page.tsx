import { SummaryCard } from '../../../shared/components/summary-card'
import { DashboardLayout } from '../../../shared/layouts/dashboard.layout'
import { useSummary } from '../hooks/use-summary'

export function DashboardPage() {
  const { data, isLoading } = useSummary()
  
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout>
      <SummaryCard
        title="Total ONU"
        value={data.total}
      />

      <SummaryCard
        title="Registered"
        value={data.registered}
      />

      <SummaryCard
        title="Unregistered"
        value={data.unregistered}
      />

      <SummaryCard
        title="Online"
        value={data.online}
      />

      <SummaryCard
        title="Fiber LOS"
        value={data.fiberLos}
      />

    </DashboardLayout>
  )
}