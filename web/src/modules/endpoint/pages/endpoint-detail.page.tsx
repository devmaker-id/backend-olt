import {
  useState
} from 'react'

import {
  useParams
} from 'react-router-dom'

import {
  Button
} from '@/components/ui/button'

import {
  PageContainer
} from '@/shared/components/page-container'

import {
  PageHeader
} from '@/shared/components/page-header'

import {
  LoadingState
} from '@/shared/components/loading-state'

import {
  ErrorState
} from '@/shared/components/error-state'

import {
  useEndpoint
} from '../hooks/use-endpoint'

import {
  useEndpointRealtime
} from '../hooks/use-endpoint-realtime'

import {
  useUnauthorizedOnus
} from '@/modules/onu/hooks/use-unauthorized-onus'

import {
  useReplaceOnu
} from '@/modules/onu-replacement/hooks/use-replace-onu'

import {
  EndpointInfoCard
} from '../components/endpoint-info-card'

import {
  EndpointOnuCard
} from '../components/endpoint-onu-card'

import {
  EndpointRealtimeCard
} from '../components/endpoint-realtime-card'

import {
  EndpointReplaceOnuCard
} from '../components/endpoint-replace-onu-card'

export function EndpointDetailPage() {

  const { id } = useParams()

  const {
    data,
    isLoading,
    error
  } = useEndpoint(id!)

  const realtimeMutation =
    useEndpointRealtime()

  const replaceMutation =
    useReplaceOnu()

  const {
    data: unauthorizedOnus
  } = useUnauthorizedOnus()

  const [
    selectedUnauthorizedId,
    setSelectedUnauthorizedId
  ] = useState('')

  if (isLoading) {
    return (
      <LoadingState />
    )
  }

  if (error || !data) {
    return (
      <ErrorState
        message="Endpoint not found"
      />
    )
  }

  const onu =
    data.onus?.[0]

  return (

    <PageContainer>

      <PageHeader
        title={data.name}
        description={data.internetNo}
      />

      <div
        className="
          space-y-6
        "
      >

        <EndpointInfoCard
          endpoint={data}
        />

        <div>

          <Button

            disabled={
              realtimeMutation.isPending
            }

            onClick={() =>
              realtimeMutation.mutate(
                data.internetNo
              )
            }
          >

            {
              realtimeMutation.isPending

                ? 'Refreshing Realtime...'

                : 'Refresh Realtime'
            }

          </Button>

        </div>

        <EndpointOnuCard
          onu={onu}
        />

        <EndpointReplaceOnuCard

          selectedId={
            selectedUnauthorizedId
          }

          onSelectedChange={
            setSelectedUnauthorizedId
          }

          unauthorizedOnus={
            unauthorizedOnus ?? []
          }

          isPending={
            replaceMutation.isPending
          }

          onReplace={() =>

            replaceMutation.mutate({

              endpointId:
                data.id,

              unauthorizedOnuId:
                selectedUnauthorizedId,

              reason:
                'ONU Rusak'
            })
          }

        />

        {
          realtimeMutation.isError && (

            <ErrorState
              message="
                Failed to retrieve
                realtime ONU data
              "
            />

          )
        }

        {
          realtimeMutation.isSuccess &&
          realtimeMutation.data && (

            <EndpointRealtimeCard

              realtime={
                realtimeMutation.data
              }

            />

          )
        }

      </div>

    </PageContainer>
  )
}