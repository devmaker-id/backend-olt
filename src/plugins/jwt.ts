import fp from 'fastify-plugin'
import jwt from '@fastify/jwt'
import { env } from '../config/env'

export default fp(async (app) => {
  app.register(jwt, {
    secret: env.jwtSecret,

    //token jwt di expired selama 1 hari
    sign: {
      expiresIn: '1d'
    }
  })
})