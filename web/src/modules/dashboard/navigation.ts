import type {
  NavigationSection
} from '@/shared/navigation/navigation.types'

import {
  LayoutDashboard
} from 'lucide-react'

export const dashboardNavigation:
  NavigationSection = {

  title: 'Dashboard',

  items: [

    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard
    }
  ]
}