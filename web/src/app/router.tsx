import {
  createBrowserRouter
} from 'react-router-dom'
import { LoginPage } from '../modules/auth/pages/login.page'

export const router =
  createBrowserRouter([
    {
      path: '/',
      element: <div>NMS</div>
    },
    {
      path: '/login',
      element: <LoginPage />
    }
  ])