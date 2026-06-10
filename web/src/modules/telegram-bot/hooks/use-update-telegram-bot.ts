import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import {
  updateTelegramBot,
} from '../api/telegram-bot.api'

import {
  appToast,
} from '@/shared/lib/toast'

import type {
  UpdateTelegramBotDto,
} from '../types/telegram-bot.types'

interface UpdateTelegramBotPayload {
  id: string

  data: UpdateTelegramBotDto
}

export function useUpdateTelegramBot() {
  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: UpdateTelegramBotPayload) =>
      updateTelegramBot(
        id,
        data,
      ),

    onSuccess() {

      queryClient.invalidateQueries({
        queryKey: [
          'telegram-bots',
        ],
      })

      appToast.success(
        'Telegram bot updated',
      )
    },

    onError(error) {

      appToast.error(
        error.message,
      )
    },
  })
}