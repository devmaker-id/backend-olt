import {
  useParams
} from 'react-router-dom'

import {
  useOnuReplacement
} from '../hooks/use-onu-replacement'

export function
OnuReplacementDetailPage() {

  const { id } =
    useParams()

  const {
    data,
    isLoading
  } = useOnuReplacement(
    id!
  )

  if (isLoading) {

    return (
      <div>
        Loading...
      </div>
    )
  }

  return (

    <div>

      <h1>
        ONU Replacement Detail
      </h1>

      <hr />

      <h2>
        Endpoint
      </h2>

      <p>
        Internet No:
        {data.endpoint.internetNo}
      </p>

      <p>
        Name:
        {data.endpoint.name}
      </p>

      <p>
        Address:
        {data.endpoint.address}
      </p>

      <hr />

      <h2>
        Old ONU
      </h2>

      <p>
        ONU ID:
        {data.oldOnu.onuId}
      </p>

      <p>
        MAC:
        {data.oldOnu.onuMac}
      </p>

      <p>
        Name:
        {data.oldOnu.onuName}
      </p>

      <p>
        Model:
        {data.oldOnu.model}
      </p>

      <hr />

      <h2>
        New ONU
      </h2>

      <p>
        ONU ID:
        {data.newOnu.onuId}
      </p>

      <p>
        MAC:
        {data.newOnu.onuMac}
      </p>

      <p>
        Name:
        {data.newOnu.onuName}
      </p>

      <p>
        Model:
        {data.newOnu.model}
      </p>

      <hr />

      <p>
        Reason:
        {data.reason}
      </p>

      <p>
        Replaced At:
        {
          new Date(
            data.createdAt
          ).toLocaleString()
        }
      </p>

    </div>
  )
}