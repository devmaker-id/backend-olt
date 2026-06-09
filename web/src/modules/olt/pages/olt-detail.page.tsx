import { useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { PageContainer } from '@/shared/components/page-container'
import { PageHeader } from '@/shared/components/page-header'
import { LoadingState } from '@/shared/components/loading-state'
import { ErrorState } from '@/shared/components/error-state'

import { useOlt } from '../hooks/use-olt'
import { useConnectOlt } from '../hooks/use-connect-olt'
import { useOltOptical } from '../hooks/use-olt-optical'

import { OltInfoCard } from '../components/olt-info-card'
import { OpticalPortTable } from '../components/optical-port-table'

export function OltDetailPage() {
  const { id } = useParams()

  const {
    data,
    isLoading,
    error,
  } = useOlt(id!)

  const {
    data: opticalPorts,
    isLoading: opticalLoading,
  } = useOltOptical(id!)

  const connectMutation =
    useConnectOlt()

  if (isLoading) {
    return <LoadingState />
  }

  if (error || !data) {
    return (
      <ErrorState
        message="OLT tidak ditemukan"
      />
    )
  }

  return (
    <PageContainer>
      <PageHeader
        title={data.name}
        description="OLT Detail Information"
      />

      <OltInfoCard
        olt={data}
      />

      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() =>
            connectMutation.mutate(
              data.id
            )
          }
          disabled={
            connectMutation.isPending
          }
        >
          {connectMutation.isPending
            ? 'Connecting...'
            : 'Connect'}
        </Button>

        <Button
          variant="outline"
        >
          System Info
        </Button>

        <Button
          variant="outline"
        >
          Sync Inventory
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Optical Ports
          </CardTitle>
        </CardHeader>

        <CardContent>
          {opticalLoading ? (
            <p>
              Loading optical ports...
            </p>
          ) : (
            <OpticalPortTable
              ports={
                opticalPorts ?? []
              }
            />
          )}
        </CardContent>
      </Card>

      {connectMutation.data && (
        <Card>
          <CardHeader>
            <CardTitle>
              Connection Result
            </CardTitle>
          </CardHeader>

          <CardContent>
            <pre
              className="
                overflow-auto
                rounded-md
                bg-muted
                p-4
                text-sm
              "
            >
              {JSON.stringify(
                connectMutation.data,
                null,
                2
              )}
            </pre>
          </CardContent>
        </Card>
      )}
    </PageContainer>
  )
}