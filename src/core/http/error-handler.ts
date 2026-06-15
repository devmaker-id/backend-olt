import {
    FastifyError,
    FastifyReply,
    FastifyRequest,
} from "fastify";

import { logger } from "../logger";
import { AppError } from "../errors/app-error";
import { fail } from "./response";
import { ZodError } from "zod";

export function registerErrorHandler(
    app: any
) {
    app.setErrorHandler(
        async(
            error: FastifyError | Error,
            request: FastifyRequest,
            reply: FastifyReply
        ) => {
            if ( (error as any).code === 'FST_ERR_CTP_EMPTY_JSON_BODY' ) {
                return reply.status(400).send(
                    fail(
                    'VALIDATION_ERROR',
                    {
                        body: [
                        'REQUEST_BODY_REQUIRED'
                        ]
                    }
                    )
                )
            }
            if(error instanceof ZodError) {
                return reply.status(400).send(
                    fail(
                        'VALIDATION_ERROR',
                        error.flatten().fieldErrors,
                    )
                )
            }

            if(error instanceof AppError) {
                return reply.status(
                    error.statusCode
                ).send(
                    fail(
                        error.code,
                        error.details,
                    ),
                );
            }

            logger.error({
                type: error.constructor.name,
                code: (error as any).code,
                message: error.message
            })

            return reply.status(500).send(
                fail(
                    "INTERNAL_SERVER_ERROR"
                ),
            );
        }
    )
}