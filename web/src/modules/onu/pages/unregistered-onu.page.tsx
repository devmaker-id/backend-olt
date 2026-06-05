import { useState } from 'react'

import { useUnregisteredOnus } from '../../../hooks/use-unregistered-onus'
import { useAuthorizeOnu } from '../../../hooks/use-authorize-onu'
import type { UnregisteredOnu } from '../../../types/onu.types'

export function UnregisteredOnuPage() {

  const {
    data = [],
    isLoading
  } = useUnregisteredOnus()

  const authorizeMutation = useAuthorizeOnu()

  const [search, setSearch] =
    useState('')

  const [page, setPage] =
    useState(1)

  const pageSize = 10

  const filtered =
    data.filter(onu => {

      const keyword =
        search.toLowerCase()

      return (
        onu.onuName
          ?.toLowerCase()
          .includes(keyword)

        ||

        onu.macAddress
          ?.toLowerCase()
          .includes(keyword)

        ||

        onu.onuId
          ?.toLowerCase()
          .includes(keyword)
      )
    })

  const totalPages =
    Math.ceil(
      filtered.length /
      pageSize
    )

  const paginated =
    filtered.slice(
      (page - 1) * pageSize,
      page * pageSize
    )

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  async function handleAuthorize(
    onu: UnregisteredOnu
  ){
    const name = prompt('Name pelanggan')
    if(!name) {return}
    const address = prompt('Alamat')
    if(!address){return}
    try {
      await authorizeMutation.mutateAsync({
        macAddress: onu.macAddress,
        endpoint: {
          type: 'CUSTOMER',
          name,
          address
        }
      })
      alert('Onu Berhasil di AUTHORIZE')
    } catch(error) {
      alert('AUTHORIZE Gagal!!!')
    }
  }

  return (
    <div>

      <h1>
        Unregistered ONU
      </h1>

      <input
        placeholder="Cari ONU"
        value={search}
        onChange={event => {
          setSearch(
            event.target.value
          )
          setPage(1)
        }}
      />

      <br />
      <br />

      <table>

        <thead>
          <tr>
            <th>ONU ID</th>
            <th>EPON</th>
            <th>MAC</th>
            <th>NAME</th>
            <th>MODEL</th>
            <th>ACTION</th>
          </tr>
        </thead>

        <tbody>

          {paginated.map(
            onu => (
              <tr
                key={
                  onu.macAddress
                }
              >
                <td>
                  {onu.onuId}
                </td>

                <td>
                  {onu.eponPort}
                </td>

                <td>
                  {onu.macAddress}
                </td>

                <td>
                  {onu.onuName}
                </td>

                <td>
                  {onu.model}
                </td>
                <td>
                  <button
                    onClick={() => 
                      handleAuthorize(onu)
                    }
                  >
                    Authorize
                  </button>
                </td>
              </tr>
            )
          )}

        </tbody>

      </table>

      <br />

      <button
        disabled={page === 1}
        onClick={() =>
          setPage(
            page - 1
          )
        }
      >
        Prev
      </button>

      <span
        style={{
          margin:
            '0 10px'
        }}
      >
        {page}
        {' / '}
        {totalPages}
      </span>

      <button
        disabled={
          page === totalPages
        }
        onClick={() =>
          setPage(
            page + 1
          )
        }
      >
        Next
      </button>

    </div>
  )
}