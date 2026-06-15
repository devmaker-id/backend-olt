import { AppError } from "./app-error"

export class UnauthorizedError extends AppError {
  constructor(
    code = "UNAUTHORIZED",
    details?: unknown,
  ) {
    super(
      401,
      code,
      details,
    )
  }
}