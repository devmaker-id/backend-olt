import Fastify from 'fastify'
import jwtPlugin from './plugins/jwt'
import { authRoutes } from './modules/auth/auth.routes'
import { userRoutes } from './modules/users/users.routes'
import { oltRoutes } from './modules/olt/olt.routes'
import { onuRoutes } from './modules/onu/onu.routes'
import { endpointRoutes } from './modules/enpoint/endpoint.routes'

const app = Fastify({
  logger: true
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

export default app