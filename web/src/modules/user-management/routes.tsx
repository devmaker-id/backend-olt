import { OwnerRoute } from '@/shared/routes/owner-route'
import {
  UserListPage,
} from './pages/user-list.page'

export const userManagementRoutes = [

  {
    path: 'users',

    element: (
      <OwnerRoute>
        <UserListPage />
      </OwnerRoute>
    ),
  },

]