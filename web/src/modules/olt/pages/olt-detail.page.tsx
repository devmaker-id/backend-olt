import { useParams } from 'react-router-dom'
import { useOlt } from '../hooks/use-olt'
import { useConnectOlt } from '../hooks/use-connect-olt'
import { useOltOptical } from '../hooks/use-olt-optical'

export function OltDetailPage() {

  const { id } = useParams()

  const {
    data,
    isLoading
  } = useOlt(
    id!
  )
  const {
    data: opticalPorts,
    isLoading: opticalLoading
  } = useOltOptical(
    id!
  )

  const connectMutation = useConnectOlt()

  if (isLoading) {

    return (
      <div>
        Loading OLT...
      </div>
    )
  }

  if (!data) {

    return (
      <div>
        OLT tidak ditemukan
      </div>
    )
  }

  return (

    <div>

      <h1>
        {data.name}
      </h1>

      <table border={1}>

        <tbody>

          <tr>
            <td>ID</td>
            <td>{data.id}</td>
          </tr>

          <tr>
            <td>Name</td>
            <td>{data.name}</td>
          </tr>

          <tr>
            <td>Syslog</td>
            <td>{data.syslogName}</td>
          </tr>

          <tr>
            <td>IP Address</td>
            <td>{data.ipAddress}</td>
          </tr>

          <tr>
            <td>Telnet Port</td>
            <td>{data.telnetPort}</td>
          </tr>

          <tr>
            <td>Vendor</td>
            <td>{data.vendor}</td>
          </tr>

          <tr>
            <td>Location</td>
            <td>
              {data.location ?? '-'}
            </td>
          </tr>

          <tr>
            <td>Created At</td>
            <td>
              {data.createdAt}
            </td>
          </tr>

          <tr>
            <td>Updated At</td>
            <td>
              {data.updatedAt}
            </td>
          </tr>

        </tbody>

      </table>

      <hr />
      <h2>
        OLT Optical Ports
      </h2>

      {
        opticalLoading && (
          <p>
            Loading optical ports...
          </p>
        )
      }

      {
        opticalPorts && (

          <table border={1}>

            <thead>

              <tr>

                <th>
                  Port
                </th>

                <th>
                  Status
                </th>

                <th>
                  Temperature
                </th>

                <th>
                  Voltage
                </th>

                <th>
                  Tx Bias
                </th>

                <th>
                  Tx Power
                </th>

              </tr>

            </thead>

            <tbody>

              {
                opticalPorts.map(
                  (port: any) => (

                    <tr
                      key={port.port}
                    >

                      <td>
                        {port.port}
                      </td>

                      <td>

                        {
                          port.status === 'ONLINE'
                            ? '🟢 ONLINE'
                            : '🔴 NO MODULE'
                        }

                      </td>

                      <td>
                        {port.temperature}
                      </td>

                      <td>
                        {port.voltage}
                      </td>

                      <td>
                        {port.txBias}
                      </td>

                      <td>
                        {port.txPower}
                      </td>

                    </tr>
                  )
                )
              }

            </tbody>

          </table>
        )
      }

      <br />

      <button
        disabled={
            connectMutation.isPending
        }
        onClick={ () =>
            connectMutation.mutate(
                data.id
            )
        }
      >
        {connectMutation.isPending ? 'Connecting...' : 'Connect'}
      </button>

      {' '}

      <button>
        System Info
      </button>

      {' '}

      <button>
        Sync Inventory
      </button>
      {
        connectMutation.data && (

            <div>

            <hr />

            <h3>
                Connection Result
            </h3>

            <pre>

                {
                JSON.stringify(
                    connectMutation.data,
                    null,
                    2
                )
                }

            </pre>

            </div>
        )
       }

    </div>
  )
}