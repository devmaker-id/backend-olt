import Swal from 'sweetalert2'

import {
  Link,
  useNavigate
} from 'react-router-dom'

import {
  useTelegramBots
} from '../hooks/use-telegram-bots'

import {
  useDeleteTelegramBot
} from '../hooks/use-delete-telegram-bot'

export function
TelegramBotListPage() {

  const navigate =
    useNavigate()

  const {
    data,
    isLoading
  } = useTelegramBots()

  const deleteMutation =
    useDeleteTelegramBot()

  if (isLoading) {

    return (
      <div>
        Loading...
      </div>
    )
  }

  async function handleDelete(
    bot: any
  ) {

    const result =
      await Swal.fire({

        icon: 'warning',

        title:
          'Hapus Bot?',

        text:
          bot.name,

        showCancelButton: true,

        confirmButtonText:
          'Hapus',

        cancelButtonText:
          'Batal'
      })

    if (!result.isConfirmed) {
      return
    }

    try {

      await deleteMutation.mutateAsync(
        bot.id
      )

      await Swal.fire({

        icon: 'success',

        title:
          'Bot berhasil dihapus'
      })

      window.location.reload()

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

  return (

    <div>

      <h1>
        Telegram Bots
      </h1>

      <Link
        to="/telegram-bots/create"
      >
        Create Bot
      </Link>

      <table border={1}>

        <thead>

          <tr>

            <th>Name</th>

            <th>Username</th>

            <th>Bot ID</th>

            <th>Chat ID</th>

            <th>Status</th>

            <th>Aksi</th>

          </tr>

        </thead>

        <tbody>

          {data?.map(
            (bot: any) => (

              <tr
                key={bot.id}
              >

                <td>

                  <Link
                    to={`/telegram-bots/${bot.id}`}
                  >
                    {bot.name}
                  </Link>

                </td>

                <td>
                  @{bot.username}
                </td>

                <td>
                  {bot.telegramBotId}
                </td>

                <td>
                  {bot.defaultChatId}
                </td>

                <td>

                  {
                    bot.isActive
                      ? 'ACTIVE'
                      : 'INACTIVE'
                  }

                </td>

                <td>

                  <Link
                    to={`/telegram-bots/${bot.id}/edit`}
                  >
                    Edit
                  </Link>

                  {' '}

                  <button
                    onClick={() =>
                      handleDelete(bot)
                    }
                  >
                    Hapus
                  </button>

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  )
}