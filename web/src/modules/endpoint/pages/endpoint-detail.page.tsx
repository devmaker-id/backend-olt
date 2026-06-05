import {
  useParams
} from 'react-router-dom'

import {
  useEndpoint
} from '../hooks/use-endpoint'

import {
  useEndpointRealtime
} from '../hooks/use-endpoint-realtime'

export function EndpointDetailPage() {

  const { id } = useParams()

  const {
    data,
    isLoading
  } = useEndpoint(id!)

  const realtimeMutation =
    useEndpointRealtime()

  if (isLoading) {
    return (
      <div>
        Loading endpoint...
      </div>
    )
  }

  if (!data) {
    return (
      <div>
        Endpoint tidak ditemukan
      </div>
    )
  }

  const onu =
    data.onus?.[0]

  const realtime =
    realtimeMutation.data

  return (
    <div>

      <h1>
        {data.name}
      </h1>

      <p>
        Internet No:
        {' '}
        {data.internetNo}
      </p>

      <p>
        Address:
        {' '}
        {data.address}
      </p>

      <button
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
            ? 'Connecting OLT...'
            : 'Refresh Realtime'
        }
      </button>

      <hr />

      <h2>
        Database ONU
      </h2>

      <p>
        ONU ID:
        {' '}
        {onu?.onuId ?? '-'}
      </p>

      <p>
        EPON:
        {' '}
        {onu?.eponPort ?? '-'}
      </p>

      <p>
        MAC:
        {' '}
        {onu?.onuMac ?? '-'}
      </p>

      <p>
        Status:
        {' '}
        {onu?.connectionState ?? '-'}
      </p>

      <p>
        RX:
        {' '}
        {onu?.rxPower ?? '-'}
      </p>

      <p>
        TX:
        {' '}
        {onu?.txPower ?? '-'}
      </p>

      {
        realtimeMutation.isError && (
          <>
            <hr />

            <p>
              Gagal mengambil data realtime dari OLT
            </p>
          </>
        )
      }

      {
        realtime && (
          <>
            <hr />

            <h2>
              Realtime ONU
            </h2>

            <p>
              Status:
              {' '}
              {realtime.onu.status}
            </p>

            <p>
              Signal:
              {' '}
              {
                realtime.onu.signalStatus === 'GOOD'
                  ? '🟢 GOOD'
                  : realtime.onu.signalStatus === 'WARNING'
                  ? '🟡 WARNING'
                  : realtime.onu.signalStatus === 'CRITICAL'
                  ? '🔴 CRITICAL'
                  : realtime.onu.signalStatus
              }
            </p>

            <p>
              Port:
              {' '}
              {realtime.onu.port}
            </p>

            <p>
              Model:
              {' '}
              {realtime.onu.model}
            </p>

            <p>
              RX Power:
              {' '}
              {realtime.onu.rxPower}
            </p>

            <p>
              TX Power:
              {' '}
              {realtime.onu.txPower}
            </p>

            <p>
              Temperature:
              {' '}
              {realtime.onu.temperature}
            </p>

            <p>
              Offline Count:
              {' '}
              {realtime.onu.offlineCount}
            </p>

            <p>
              First Uptime:
              {' '}
              {realtime.onu.firstUptime ?? '-'}
            </p>

            <p>
              Last Offtime:
              {' '}
              {realtime.onu.lastOfftime ?? '-'}
            </p>

          </>
        )
      }

    </div>
  )
}