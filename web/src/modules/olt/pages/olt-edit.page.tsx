import {
  useState,
  useEffect
} from 'react'

import {
  useParams,
  useNavigate
} from 'react-router-dom'

import Swal from 'sweetalert2'

import {
  useOlt
} from '../hooks/use-olt'

import {
  useUpdateOlt
} from '../hooks/use-update-olt'

export function OltEditPage() {

  const { id } =
    useParams()

  const navigate =
    useNavigate()

  const {
    data,
    isLoading
  } = useOlt(
    id!
  )

  const updateMutation =
    useUpdateOlt()

  const [form, setForm] =
    useState<any>({
      name: '',
      syslogName: '',
      ipAddress: '',
      telnetPort: 23,
      username: '',
      password: '',
      vendor: '',
      location: ''
    })

  useEffect(() => {

    if (!data) {
      return
    }

    setForm({

      name:
        data.name,

      syslogName:
        data.syslogName,

      ipAddress:
        data.ipAddress,

      telnetPort:
        data.telnetPort,

      username:
        data.username,

      password:
        data.password,

      vendor:
        data.vendor,

      location:
        data.location
    })

  }, [data])

  async function handleSubmit(
    event: React.FormEvent
  ) {

    event.preventDefault()

    try {

      await updateMutation.mutateAsync({

        id,

        data: form
      })

      await Swal.fire({

        icon: 'success',

        title:
          'OLT berhasil diupdate'
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
        Edit OLT
      </h1>

      <form
        onSubmit={handleSubmit}
      >

        <input
          value={form.name}
          onChange={(event) =>
            setForm({
              ...form,
              name:
                event.target.value
            })
          }
        />

        <input
          value={form.syslogName}
          onChange={(event) =>
            setForm({
              ...form,
              syslogName:
                event.target.value
            })
          }
        />

        <input
          value={form.ipAddress}
          onChange={(event) =>
            setForm({
              ...form,
              ipAddress:
                event.target.value
            })
          }
        />

        <input
          type="number"
          value={form.telnetPort}
          onChange={(event) =>
            setForm({
              ...form,
              telnetPort:
                Number(
                  event.target.value
                )
            })
          }
        />

        <input
          value={form.username}
          onChange={(event) =>
            setForm({
              ...form,
              username:
                event.target.value
            })
          }
        />

        <input
          type="password"
          value={form.password}
          onChange={(event) =>
            setForm({
              ...form,
              password:
                event.target.value
            })
          }
        />

        <input
          value={form.vendor}
          onChange={(event) =>
            setForm({
              ...form,
              vendor:
                event.target.value
            })
          }
        />

        <input
          value={form.location}
          onChange={(event) =>
            setForm({
              ...form,
              location:
                event.target.value
            })
          }
        />

        <button
          type="submit"
          disabled={
            updateMutation.isPending
          }
        >

          {
            updateMutation.isPending
              ? 'Updating...'
              : 'Update'
          }

        </button>

      </form>

    </div>
  )
}