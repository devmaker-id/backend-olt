import { useEndpoints } from '../../../hooks/use-endpoints'
import { Link } from 'react-router-dom'

export function EndpointListPage() {
  const { data, isLoading } = useEndpoints()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Endpoints</h1>

      <table>
        <thead>
          <tr>
            <th>Internet No</th>
            <th>Nama</th>
            <th>Alamat</th>
            <th>Status</th>
            <th>RX Power</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((endpoint: any) => {
            const onu = endpoint.onus?.[0]

            return (
              <tr key={endpoint.id}>
                <td>
                  {endpoint.internetNo}
                </td>

                <td>
                  <Link
                    to={`/endpoints/${endpoint.id}`}
                  >
                    {endpoint.name}
                  </Link>
                </td>

                <td>
                  {endpoint.address}
                </td>

                <td>
                  {onu?.connectionState}
                </td>

                <td>
                  {onu?.rxPower}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}