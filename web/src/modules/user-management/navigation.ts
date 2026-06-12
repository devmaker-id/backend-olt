import {
  Users,
} from 'lucide-react'

export const userManagementNavigation = {
  title: 'System',
  roles: [
    'OWNER'
  ],
  items: [
    {
      label: 'Users',
      path: '/users',
      icon: Users,
    },
  ],

}