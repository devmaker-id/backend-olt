import {
  useEffect,
  useState
} from 'react'

import {
  useNavigate,
  useParams
} from 'react-router-dom'

import Swal from 'sweetalert2'

import {
  useTelegramBot
} from '../hooks/use-telegram-bot'

import {
  useUpdateTelegramBot
} from '../hooks/use-update-telegram-bot'

export function
TelegramBotEditPage() {

  const { id } =
    useParams()

  const navigate =
    useNavigate()

  const {
    data,
    isLoading
  } = useTelegramBot(
    id!
  )

  const updateMutation =
    useUpdateTelegramBot()

  const [form, setForm] =
    useState({

      name: '',

      defaultChatId: '',

      webhookUrl: '',

      description: '',

      isActive: true
    })

  useEffect(() => {

    if (!data) {
      return
    }

    setForm({

      name:
        data.name || '',

      defaultChatId:
        data.defaultChatId || '',

      webhookUrl:
        data.webhookUrl || '',

      description:
        data.description || '',

      isActive:
        data.isActive
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
          'Bot berhasil diupdate'
      })

      navigate(
        '/telegram-bots'
      )

    } catch (error: any) {

      await Swal.fire({

        icon: 'error',

        title:
          'Gagal',

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
        Edit Telegram Bot
      </h1>

      <form
        onSubmit={handleSubmit}
      >

        <input

          placeholder="Name"

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

          placeholder="Default Chat Id"

          value={form.defaultChatId}

          onChange={(event) =>
            setForm({

              ...form,

              defaultChatId:
                event.target.value
            })
          }
        />

        <input

          placeholder="Webhook Url"

          value={form.webhookUrl}

          onChange={(event) =>
            setForm({

              ...form,

              webhookUrl:
                event.target.value
            })
          }
        />

        <input

          placeholder="Description"

          value={form.description}

          onChange={(event) =>
            setForm({

              ...form,

              description:
                event.target.value
            })
          }
        />

        <label>

          <input

            type="checkbox"

            checked={form.isActive}

            onChange={(event) =>
              setForm({

                ...form,

                isActive:
                  event.target.checked
              })
            }
          />

          Active

        </label>

        <br />

        <button
          type="submit"
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