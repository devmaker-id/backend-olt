import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: {
      id: string
      role:sting
    }
    user: {
      id: string
      role: string
    }
  }
}