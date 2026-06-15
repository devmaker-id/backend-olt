import { AppError } from "./app-error";

export class ConflictError extends AppError {
    constructor(
        code = "CONFLICT",
        details?: unknown
    ) {
        super(
            409,
            code,
            details
        )
    }
}