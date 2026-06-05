import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwtPlugin from './plugins/jwt'
import { authRoutes } from './modules/auth/auth.routes'
import { userRoutes } from './modules/users/users.routes'
import { oltRoutes } from './modules/olt/olt.routes'
import { onuRoutes } from './modules/onu/onu.routes'
import { endpointRoutes } from './modules/endpoint/endpoint.routes'
import { modulesTelegramRoutes } from './modules/telegram/telegram.routes'
import { telegramBotRoutes } from './modules/telegram-bot/telegram-bot.routes'

const app = Fastify({
  logger: true
})

app.register(cors, {
  //jika live tentukna
  // origin: 'http://localhost:5173'
  origin: true //development
})

app.register(jwtPlugin)

app.register(authRoutes, {
  prefix: '/api/auth'
})
app.register(userRoutes, {
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

export default app