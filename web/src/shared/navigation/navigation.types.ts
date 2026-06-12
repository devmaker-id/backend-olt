import type {
  LucideIcon
} from 'lucide-react'

export interface NavigationItem {
  label: string
  path: string
  icon: LucideIcon
  roles?: string[]
}

export interface NavigationSection {
  title: string
  items: NavigationItem[]
}