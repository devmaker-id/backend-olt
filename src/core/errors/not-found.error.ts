import { AppError } from "./app-error";

export class NotFoundError
    extends AppError {
        constructor(
            code = "NOT FOUND",
            details?: unknown,
        ) {
            super(
                404,
                code,
                details
            )
        }
    }