import Fastify from 'fastify'
import { logger } from './core/logger'

import cors from '@fastify/cors'
import jwtPlugin from './plugins/jwt'

import { registerErrorHandler } from './core/http/error-handler'

import { telegramRouter } from './services/telegram/telegram.router'
import { authRoutes } from './modules/auth/auth.routes'
import { usersRoutes } from './modules/users/users.routes'
import { oltRoutes } from './modules/olt/olt.routes'
import { onuRoutes } from './modules/onu/onu.routes'
import { endpointRoutes } from './modules/endpoint/endpoint.routes'
import { modulesTelegramRoutes } from './modules/telegram/telegram.routes'
import { telegramBotRoutes } from './modules/telegram-bot/telegram-bot.routes'
import { onuReplacementRoutes } from './modules/onu-replacement/onu-replacement.routes'

const app = Fastify({
  loggerInstance: logger
})

app.register(cors, {
  //jika live tentukna
  // origin: 'http://localhost:5173'
  origin: true //development
})

app.register(jwtPlugin)

registerErrorHandler(app)

app.register(telegramRouter, {
  prefix: '/api/webhook'
})
app.register(authRoutes, {
  prefix: '/api/auth'
})
app.register(usersRoutes, {
  prefix: '/api/users'
})
app.register(oltRoutes, {
  prefix: '/api/olt'
})
app.register(onuRoutes, {
  prefix: '/api/onu'
})
app.register( endpointRoutes, {
  prefix: '/api/endpoint'
})
app.register( modulesTelegramRoutes, {
  prefix: '/api/telegram/users'
})
app.register(
  telegramBotRoutes,
  {
    prefix: '/api/telegram-bots'
  }
)
app.register(
  onuReplacementRoutes,
  {
    prefix: '/api/onu-replacement'
  }
)

export default app