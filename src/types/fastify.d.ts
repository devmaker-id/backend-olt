import '@fastify/jwt'
import { Role } from "../config/prisma"

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: {
      id: string
      role: Role
    }
    user: {
      id: string
      role: Role
    }
  }
}