import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLogin } from "../../../hooks/use-login"

export function LoginPage() {
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

            localStorage.setItem(
                'token',
                result.token
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
        <div>
            <h1>
                Login Nms
            </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input placeholder="Username" value={username} onChange={event =>
                        setUsername(event.target.value)
                    } />
                </div>
                <div>
                    <input placeholder="Password" value={password} onChange={event =>
                        setPassword(event.target.value)
                    } />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}