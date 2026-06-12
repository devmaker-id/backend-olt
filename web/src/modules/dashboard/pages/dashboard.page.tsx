import {

  Wifi,

  CheckCircle2,

  AlertTriangle,

  Activity

} from 'lucide-react'

import {
  useSummary
} from '../hooks/use-summary'

import {
  SummaryCard
} from '@/shared/components/summary-card'

import {
  LoadingState
} from '@/shared/components/loading-state'

import {
  ErrorState
} from '@/shared/components/error-state'

import {
  PageContainer
} from '@/shared/components/page-container'

import {
  PageHeader
} from '@/shared/components/page-header'
import { useNavigate } from 'react-router-dom'

export function DashboardPage() {

  const {
    data,
    isLoading,
    error
  } = useSummary()
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <LoadingState />
    )
  }

  if (error || !data) {
    return (
      <ErrorState
        message="Failed to load dashboard summary."
      />
    )
  }

  return (

    <PageContainer>

      <PageHeader

        title="Dashboard"

        description="Network Overview"

      />

      <div
        className="
          grid
          gap-4
          sm:grid-cols-2
          xl:grid-cols-5
        "
      >

        <SummaryCard

          title="Total ONU"

          value={data.total}

          description="Registered + Unregistered"

          icon={
            <Activity
              className="
                h-5
                w-5
                text-muted-foreground
              "
            />
          }

        />

        <SummaryCard

          title="Registered"

          value={data.registered}

          icon={
            <CheckCircle2
              className="
                h-8
                w-8
              "
            />
          }
        />

        <SummaryCard

          title="Unregistered"

          value={data.unregistered}

          onClick={() =>
            navigate(
              '/onu/unregistered'
            )
          }

          icon={
            <AlertTriangle
              className="
                h-5
                w-5
              "
            />
          }

        />

        <SummaryCard

          title="Online"

          value={data.online}

          icon={
            <Wifi
              className="
                h-8
                w-8
              "
            />
          }
        />

        <SummaryCard

          title="Fiber LOS"

          value={data.fiberLos}

          icon={
            <AlertTriangle
              className="
                h-8
                w-8
              "
            />
          }
        />

      </div>

    </PageContainer>
  )
}