import type {
  NavigationSection
} from '@/shared/navigation/navigation.types'

import {
  Server
} from 'lucide-react'

export const oltNavigation:
  NavigationSection = {

  title: 'Network',

  items: [

    {
      label: 'OLTs',
      path: '/olts',
      icon: Server
    },
    {
      label: 'Add Olt',
      path: '/olt/create',
      icon: Server
    }
  ]
}