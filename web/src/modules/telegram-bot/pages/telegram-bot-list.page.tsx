import {
  Link
} from 'react-router-dom'

import {
  useTelegramBots
} from '../hooks/use-telegram-bots'

export function
TelegramBotListPage() {

  const {
    data,
    isLoading
  } = useTelegramBots()

  if (isLoading) {
    return <div>Loading...</div>
  }

  async function handleEdit(bot){
    alert(`Edit bot ID: ${bot.id}`)
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
                  <button
                    onClick={()=>
                      handleEdit(bot)
                    }
                  >edit</button>
                  <button>hapus</button>
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  )
}