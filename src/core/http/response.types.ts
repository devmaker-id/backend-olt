export interface ApiResponse<T> {
    success: true
    message: string
    data: T
}
export interface ApiListMeta {
    total: number
    page?: number
    limit?: number
}
export interface ApiListResponse<T> {
    success: true
    message: string
    data: T[]
    meta: ApiListMeta
}
export interface ApiErrorResponse {
    success: false
    message: string
    errors?: unknown
}