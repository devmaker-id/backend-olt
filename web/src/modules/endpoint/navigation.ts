import type {
  NavigationSection
} from '@/shared/navigation/navigation.types'

import {
  Users
} from 'lucide-react'

export const endpointNavigation:
  NavigationSection = {

  title: 'Customer',

  items: [

    {
      label: 'Endpoints',
      path: '/endpoints',
      icon: Users
    }
  ]
}