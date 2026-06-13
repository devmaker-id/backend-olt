import type {
  LucideIcon
} from 'lucide-react'

export interface NavigationItem {
  label: string
  path: string
  icon: LucideIcon
  roles?: string[]
  end?: boolean
}

export interface NavigationSection {
  title: string
  roles?: string[]
  items: NavigationItem[]
}