export class AppError extends Error {
    constructor(
        public readonly statusCode: number,
        public readonly code: string,
        public readonly details?: unknown
    ) {
        super(code)
        this.name = this.constructor.name
        
        Error.captureStackTrace?.(
            this,
            this.constructor
        )
    }
}