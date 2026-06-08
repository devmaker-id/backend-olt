import { useMutation } from '@tanstack/react-query'
import { testTelegramBot } from '../api/telegram-bot.api'

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
    )
  })
}