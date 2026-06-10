import { useMutation } from '@tanstack/react-query'
import { testTelegramBot } from '../api/telegram-bot.api'
import { appToast } from '@/shared/lib/toast'

export function useTestTelegramBot() {
  return useMutation({
    mutationFn: ({
      id,
      chatId
    }: {
      id: string,
      chatId: string
    }) => testTelegramBot(
      id,
      chatId
    ),
    onSuccess() {

      appToast.success(
        'Test message sent',
      )
    }
  })
}