import {
  useState
} from 'react'

import {
  useNavigate
} from 'react-router-dom'

import {
  useCreateTelegramBot
} from '../hooks/use-create-telegram-bot'

export function
TelegramBotCreatePage() {

  const navigate =
    useNavigate()

  const mutation =
    useCreateTelegramBot()

  const [name, setName] =
    useState('')

  const [token, setToken] =
    useState('')

  const [defaultChatId,
    setDefaultChatId] =
      useState('')

  async function
  handleSubmit(
    event: React.FormEvent
  ) {

    event.preventDefault()

    await mutation.mutateAsync({

      name,

      token,

      defaultChatId
    })

    navigate(
      '/telegram-bots'
    )
  }

  return (

    <form
      onSubmit={handleSubmit}
    >

      <h1>
        Create Telegram Bot
      </h1>

      <input
        placeholder="Name"
        value={name}
        onChange={event =>
          setName(
            event.target.value
          )
        }
      />

      <input
        placeholder="Bot Token"
        value={token}
        onChange={event =>
          setToken(
            event.target.value
          )
        }
      />

      <input
        placeholder="Default Chat Id"
        value={defaultChatId}
        onChange={event =>
          setDefaultChatId(
            event.target.value
          )
        }
      />

      <button
        type="submit"
      >
        Save
      </button>

    </form>
  )
}