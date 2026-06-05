import {
  useParams
} from 'react-router-dom'

import {
  useEndpoint
} from '../hooks/use-endpoint'

export function EndpointDetailPage() {

  const { id } = useParams()

  const {
    data,
    isLoading
  } = useEndpoint(
    id!
  )

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  const onu = data?.onus?.[0]

  return (
    <div>

      <h1>
        {data?.name}
      </h1>

      <p>
        Internet No:
        {data?.internetNo}
      </p>

      <p>
        Address:
        {data?.address}
      </p>

      <hr />

      <h2>
        ONU
      </h2>

      <p>
        ONU ID:
        {onu?.onuId}
      </p>

      <p>
        EPON:
        {onu?.eponPort}
      </p>

      <p>
        MAC:
        {onu?.onuMac}
      </p>

      <p>
        Status:
        {onu?.connectionState}
      </p>

      <p>
        RX:
        {onu?.rxPower}
      </p>

      <p>
        TX:
        {onu?.txPower}
      </p>

    </div>
  )
}