import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { useOlts } from '../hooks/use-olts'
import { useDeleteOlt } from '../hooks/use-delete-olt'

export function OltListPage() {
  const { data, isLoading } = useOlts()
  const deleteMutation = useDeleteOlt()

  async function handleDelete(id:string, name:string) {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Delete Olt',
      text: name,
      showCancelButton: true
    })
    if(!result.isConfirmed) {
      return
    }
    await deleteMutation.mutateAsync(id)
    await Swal.fire({
      icon: 'success',
      title: 'OLT Deleted'
    })
    window.location.reload()
  }

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
      <Link
        to="/olt/create"
      >
        Create OLT
      </Link>

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
                      to={`/olt/${olt.id}/edit`}
                    >
                      Edit
                    </Link>
                    {' | '}
                    <Link
                      to={`/olt/${olt.id}`}
                    >
                      Detail
                    </Link>
                    {' | '}
                    <button
                      onClick={()=>{
                        handleDelete(
                          olt.id,
                          olt.name
                        )
                      }}
                    >
                      Delete
                    </button>

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