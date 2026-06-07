import {
  Link
} from 'react-router-dom'

import {
  useOlts
} from '../hooks/use-olts'

export function OltListPage() {

  const {
    data,
    isLoading
  } = useOlts()

  if (isLoading) {

    return (
      <div>
        Loading OLT...
      </div>
    )
  }

  return (

    <div>

      <h1>
        OLT List
      </h1>

      <table border={1}>

        <thead>

          <tr>

            <th>
              Name
            </th>

            <th>
              Syslog
            </th>

            <th>
              IP Address
            </th>

            <th>
              Vendor
            </th>

            <th>
              Location
            </th>

            <th>
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {
            data?.map(
              (olt: any) => (

                <tr
                  key={olt.id}
                >

                  <td>
                    {olt.name}
                  </td>

                  <td>
                    {olt.syslogName}
                  </td>

                  <td>
                    {olt.ipAddress}
                  </td>

                  <td>
                    {olt.vendor}
                  </td>

                  <td>
                    {olt.location}
                  </td>

                  <td>

                    <Link
                      to={`/olts/${olt.id}`}
                    >
                      Detail
                    </Link>

                  </td>

                </tr>
              )
            )
          }

        </tbody>

      </table>

    </div>
  )
}