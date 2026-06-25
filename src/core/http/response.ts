import {
    ApiErrorResponse,
    ApiListResponse,
    ApiResponse
} from "./response.types"

export function ok<T>(
    data: T,
    message: string,
): ApiResponse<T> {
    return {
        success: true,
        message,
        data
    }
}

export function create<T>(
    data: T,
    message: string,
): ApiResponse<T> {
    return {
        success: true,
        message,
        data,
    }
}

export function list<T>(
    data: T[],
    total: number,
    message: string,
): ApiListResponse<T> {
    return {
        success: true,
        message,
        data,
        meta: {
            total,
        },
    }
}

export function fail(
    message: string,
    errors?: unknown
): ApiErrorResponse {
    return {
        success: false,
        message,
        errors,
    }
}

export function noContent(
    message = "SUCCESS"
) {
    return {
        success: true,
        message,
        data: []
    }
}