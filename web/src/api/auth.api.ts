import { api } from '../shared/lib/api'
import type {
    LoginRequest,
    LoginResponse
 } from '../types/auth.types'

 export async function login(payload:LoginRequest) {
    const response = await api.post<LoginResponse>(
        'auth/login',
        payload
    )
    return response.data
 }