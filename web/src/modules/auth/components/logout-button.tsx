import { useNavigate } from 'react-router-dom'
import { logout } from '../../../shared/utils/auth'


export function LogoutButton() {

  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate(
      '/login'
    )
  }

  return (
    <button
      onClick={handleLogout}
    >
      Logout
    </button>
  )
}