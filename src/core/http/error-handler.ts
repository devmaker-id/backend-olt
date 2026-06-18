import {
  FastifyError,
  FastifyReply,
  FastifyRequest,
} from 'fastify'

import { ZodError } from 'zod'

import { logger } from '../logger'
import { AppError } from '../errors/app-error'
import { fail } from './response'

export function registerErrorHandler(
  app: any,
) {

  app.setErrorHandler(
    async (
      error: FastifyError | Error,
      request: FastifyRequest,
      reply: FastifyReply,
    ) => {

      const code =
        (error as any).code

      switch (code) {

        case 'FST_ERR_CTP_EMPTY_JSON_BODY':
          return reply.status(400).send(
            fail(
              'VALIDATION_ERROR',
              {
                body: [
                  'REQUEST_BODY_REQUIRED',
                ],
              },
            ),
          )

        case 'FST_ERR_CTP_INVALID_MEDIA_TYPE':
          return reply.status(415).send(
            fail(
              'UNSUPPORTED_MEDIA_TYPE',
            ),
          )

        case 'FST_ERR_NOT_FOUND':
          return reply.status(404).send(
            fail(
              'ROUTE_NOT_FOUND',
            ),
          )

      }

      if (error instanceof ZodError) {

        return reply.status(400).send(
          fail(
            'VALIDATION_ERROR',
            error.flatten().fieldErrors,
          ),
        )

      }

      if (error instanceof AppError) {

        return reply.status(
          error.statusCode,
        ).send(
          fail(
            error.code,
            error.details,
          ),
        )

      }

      logger.error(
        {
          err: error,
          url: request.url,
          method: request.method,
          type: error.constructor.name,
          code,
          message: error.message,
        },
        'Unhandled error',
      )

      return reply.status(500).send(
        fail(
          'INTERNAL_SERVER_ERROR',
        ),
      )

    },
  )

}