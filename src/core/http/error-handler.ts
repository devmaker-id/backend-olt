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
            if(error instanceof ZodError) {
                return reply.status(400).send(
                    fail(
                        'VALIDATION_ERROR',
                        error.flatten().fieldErrors,
                    )
                )
            }

            logger.error(
                {
                    err: error,
                    url: request.url,
                    method: request.method
                },
                "Unhandled error",
            );

            logger.error({
                error,
                name: error.name,
                message: error.message,
                constructor: error.constructor.name,
            })

            return reply.status(500).send(
                fail(
                    "INTERNAL_SERVER_ERROR"
                ),
            );
        }
    )
}