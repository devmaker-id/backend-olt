import TelegramAccessLogsPage
from './pages/telegram-access-logs.page'

export const systemLogsRoutes = [

  {
    path: 'system-logs/telegram-access',

    element: (
      <TelegramAccessLogsPage />
    )
  }
]