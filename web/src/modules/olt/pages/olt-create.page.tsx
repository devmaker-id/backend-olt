import {
  useState
} from 'react'

import {
  useNavigate
} from 'react-router-dom'

import Swal from 'sweetalert2'

import {
  useCreateOlt
} from '../hooks/use-create-olt'

export function OltCreatePage() {

  const navigate =
    useNavigate()

  const createMutation =
    useCreateOlt()

  const [name, setName] =
    useState('')

  const [syslogName, setSyslogName] =
    useState('')

  const [ipAddress, setIpAddress] =
    useState('')

  const [telnetPort, setTelnetPort] =
    useState(23)

  const [username, setUsername] =
    useState('admin')

  const [password, setPassword] =
    useState('admin')

  const [vendor, setVendor] =
    useState('HISFOCUS')

  const [location, setLocation] =
    useState('')

  async function handleSubmit(
    event: React.FormEvent
  ) {

    event.preventDefault()

    try {

      await createMutation.mutateAsync({

        name,

        syslogName,

        ipAddress,

        telnetPort,

        username,

        password,

        vendor,

        location
      })

      await Swal.fire({

        icon: 'success',

        title: 'OLT berhasil dibuat'
      })

      navigate('/olts')

    } catch (error: any) {

      await Swal.fire({

        icon: 'error',

        title: 'Gagal',

        text:
          error?.response?.data?.message
      })
    }
  }

  return (

    <div>

      <h1>
        Create OLT
      </h1>

      <form
        onSubmit={handleSubmit}
      >

        <input
          placeholder="OLT Name"
          value={name}
          onChange={(event) =>
            setName(
              event.target.value
            )
          }
        />

        <input
          placeholder="Syslog Name"
          value={syslogName}
          onChange={(event) =>
            setSyslogName(
              event.target.value
            )
          }
        />

        <input
          placeholder="IP Address"
          value={ipAddress}
          onChange={(event) =>
            setIpAddress(
              event.target.value
            )
          }
        />

        <input
          type="number"
          placeholder="Telnet Port"
          value={telnetPort}
          onChange={(event) =>
            setTelnetPort(
              Number(
                event.target.value
              )
            )
          }
        />

        <input
          placeholder="Username"
          value={username}
          onChange={(event) =>
            setUsername(
              event.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) =>
            setPassword(
              event.target.value
            )
          }
        />

        <input
          placeholder="Vendor"
          value={vendor}
          onChange={(event) =>
            setVendor(
              event.target.value
            )
          }
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(event) =>
            setLocation(
              event.target.value
            )
          }
        />

        <button
          type="submit"
          disabled={
            createMutation.isPending
          }
        >

          {
            createMutation.isPending
              ? 'Saving...'
              : 'Save'
          }

        </button>

      </form>

    </div>
  )
}