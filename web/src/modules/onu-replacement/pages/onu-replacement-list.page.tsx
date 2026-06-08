import {
  Link
} from 'react-router-dom'

import {
  useOnuReplacements
} from '../hooks/use-onu-replacements'

export function
OnuReplacementListPage() {

  const {
    data,
    isLoading
  } = useOnuReplacements()

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
        ONU Replacement History
      </h1>

      <table border={1}>

        <thead>

          <tr>

            <th>
              Date
            </th>

            <th>
              Internet No
            </th>

            <th>
              Customer
            </th>

            <th>
              Old ONU
            </th>

            <th>
              New ONU
            </th>

            <th>
              Reason
            </th>

          </tr>

        </thead>

        <tbody>

          {data?.map(
            (item: any) => (

              <tr
                key={item.id}
              >

                <td>

                  <Link
                    to={`/onu/replacements/${item.id}`}
                  >
                    {new Date(
                      item.createdAt
                    ).toLocaleString()}
                  </Link>

                </td>

                <td>
                  {item.endpoint.internetNo}
                </td>

                <td>
                  {item.endpoint.name}
                </td>

                <td>
                  {item.oldOnu.onuMac}
                </td>

                <td>
                  {item.newOnu.onuMac}
                </td>

                <td>
                  {item.reason}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  )
}