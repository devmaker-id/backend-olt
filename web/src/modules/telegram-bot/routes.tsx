import {
  TelegramBotListPage
} from './pages/telegram-bot-list.page'

import {
  TelegramBotCreatePage
} from './pages/telegram-bot-create.page'

import {
  TelegramBotDetailPage
} from './pages/telegram-bot-detail.page'

import {
  TelegramBotEditPage
} from './pages/telegram-bot-edit.page'

export const telegramBotRoutes = [

  {
    path: 'telegram-bots',

    element: (
      <TelegramBotListPage />
    )
  },

  {
    path: 'telegram-bots/create',

    element: (
      <TelegramBotCreatePage />
    )
  },

  {
    path: 'telegram-bots/:id',

    element: (
      <TelegramBotDetailPage />
    )
  },

  {
    path: 'telegram-bots/:id/edit',

    element: (
      <TelegramBotEditPage />
    )
  }
]