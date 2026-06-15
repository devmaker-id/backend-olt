import { AppError } from "./app-error";

export class ForbiddenError extends AppError {
    constructor(
        code = "FORBIDDEN",
        details?: unknown
    ) {
        super(
            403,
            code,
            details
        )
    }
}