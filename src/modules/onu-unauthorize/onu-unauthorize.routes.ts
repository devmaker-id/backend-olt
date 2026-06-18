import { FastifyInstance } from "fastify";
import { authMiddleware } from "../../middleware/auth.middleware";
import {
    createUnauthorizeOnuController,
    getOnusUnauthorizeController,
    getUnauthorizeOnuIdController,
} from "./onu-unauthorize.controller";

export async function unauthorizeOnuRoutes(
    app: FastifyInstance
) {
    app.addHook(
        'preHandler',
        authMiddleware
    )
    app.post(
        '/',
        createUnauthorizeOnuController
    )

    app.get(
        '/',
        getOnusUnauthorizeController
    )
    app.get(
        '/:id',
        getUnauthorizeOnuIdController
    )
}