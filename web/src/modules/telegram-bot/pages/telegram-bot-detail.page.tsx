import Swal from 'sweetalert2'
import {
  useState
} from 'react'

import {
  useParams
} from 'react-router-dom'

import {
  useTelegramBot
} from '../hooks/use-telegram-bot'

import {
  useTestTelegramBot
} from '../hooks/use-test-telegram-bot'

import {
  useWebhookInfo
} from '../hooks/use-webhook-info'

import {
  useSetWebhook
} from '../hooks/use-set-webhook'

import {
  useDeleteWebhook
} from '../hooks/use-delete-webhook'

export function TelegramBotDetailPage() {

  const { id } =
    useParams()

  const {
    data,
    isLoading
  } = useTelegramBot(
    id!
  )

  const testMutation =
    useTestTelegramBot()

  const webhookMutation =
    useWebhookInfo()

  const setWebhookMutation =
    useSetWebhook()

  const deleteWebhookMutation =
    useDeleteWebhook()

  const [url, setUrl] =
    useState('')

  async function handleTestMessage() {
    try {
      const result = await testMutation.mutateAsync({
        id: data.id,
        chatId: data.defaultChatId
      })
      await Swal.fire({
        icon: 'success',
        title: 'Pesan berhasil dikirim',
        text: `${result?.result?.text}`
      })
    } catch(error: any) {
      await Swal.fire({
        icon: 'error',
        title: 'Gagal mengirim pesan',
        text: error?.response?.data?.message
      })
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (

    <div>

      <h1>
        {data.name}
      </h1>

      <p>
        Username:
        @{data.username}
      </p>

      <p>
        Bot Id:
        {data.telegramBotId}
      </p>

      <p>
        Chat Id:
        {data.defaultChatId}
      </p>

      <p>
        Webhook:
        {data.webhookUrl}
      </p>

      <button
        disabled={!data.defaultChatId}
        onClick={handleTestMessage}
      >
        Test Message
      </button>

      <button
        onClick={() =>
          webhookMutation.mutate(
            data.id
          )
        }
      >
        Get Webhook Info
      </button>

      <hr />

      <input
        placeholder="Webhook URL"
        value={url}
        onChange={event =>
          setUrl(
            event.target.value
          )
        }
      />

      <button
        onClick={() =>
          setWebhookMutation.mutate({
            id: data.id,
            url
          })
        }
      >
        Set Webhook
      </button>

      <button
        onClick={() =>
          deleteWebhookMutation.mutate(
            data.id
          )
        }
      >
        Delete Webhook
      </button>

      {
        webhookMutation.data && (

          <pre>
            {
              JSON.stringify(
                webhookMutation.data,
                null,
                2
              )
            }
          </pre>

        )
      }

    </div>
  )
}