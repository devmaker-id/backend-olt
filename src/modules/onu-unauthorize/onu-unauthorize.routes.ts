import { FastifyInstance } from "fastify";
import { authMiddleware } from "../../middleware/auth.middleware";
import {
    createUnauthorizeOnuController,
    deleteUnauthorizeOnuController,
    getOnusUnauthorizeController,
    getUnauthorizeOnuIdController,
    getUnauthorizeOnuMacController,
    getUnauthorizeOnuSnController,
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
    app.get(
        '/mac/:macAddress',
        getUnauthorizeOnuMacController
    )
    app.get(
        '/sn/:serialNumber',
        getUnauthorizeOnuSnController
    )
    app.delete(
        '/:id',
        deleteUnauthorizeOnuController
    )
}