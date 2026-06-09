import { useState } from "react"
import { login } from '../../../shared/utils/auth'

import {
    Navigate,
    useNavigate
} from "react-router-dom"
import { useLogin } from "../../../hooks/use-login"

export function LoginPage() {
    const token = localStorage.getItem( 'token' )
    if (token) {
        return (
            <Navigate
            to="/dashboard"
            replace
            />
        )
    }

    const navigate = useNavigate()
    const loginMutation = useLogin()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        try {
            const result = await loginMutation.mutateAsync({
                username,
                password
            })

            login(
                result.token,
                result.user
            )
            localStorage.setItem(
                'user',
                JSON.stringify(result.user)
            )
            
            navigate('/dashboard')
        } catch {
            alert('Login gagal')
        }
    }
    return (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            width: '100vw',
            backgroundColor: '#f0f2f5'
        }}
    >
        <form
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                padding: '2rem',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                width: '300px'
            }}
            onSubmit={handleSubmit}
        >
            <h1
                style={{
                    textAlign: 'center',
                    margin: 0
                }}
            >
                Login NMS
            </h1>

            <input
                placeholder="Username"
                value={username}
                onChange={(event) =>
                    setUsername(event.target.value)
                }
                style={{
                    padding: '10px'
                }}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) =>
                    setPassword(event.target.value)
                }
                style={{
                    padding: '10px'
                }}
            />

            <button
                type="submit"
                style={{
                    padding: '10px'
                }}
            >
                Login
            </button>
        </form>
    </div>
)
}