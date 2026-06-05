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

      <table>

        <thead>

          <tr>

            <th>Name</th>

            <th>Username</th>

            <th>Bot ID</th>

            <th>Chat ID</th>

            <th>Status</th>

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

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  )
}