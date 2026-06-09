import {
  Wifi,
  CheckCircle2,
  AlertTriangle,
  Activity,
} from 'lucide-react'

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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard
          </h1>

          <p className="text-muted-foreground">
            Network Overview
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <SummaryCard
            title="Total ONU"
            value={data.total}
            icon={<Activity className="h-10 w-10 text-red-500" />}
          />

          <SummaryCard
            title="Registered"
            value={data.registered}
            icon={<CheckCircle2 className="h-10 w-10 text-red-500" />}
          />

          <SummaryCard
            title="Unregistered"
            value={data.unregistered}
            icon={<AlertTriangle className="h-10 w-10 text-red-500" />}
          />

          <SummaryCard
            title="Online"
            value={data.online}
            icon={<Wifi className="h-10 w-10 text-red-500" />}
          />

          <SummaryCard
            title="Fiber LOS"
            value={data.fiberLos}
            icon={<AlertTriangle className="h-10 w-10 text-red-500" />}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}