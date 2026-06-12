import type {
  NavigationSection
} from './navigation.types'

import {
  dashboardNavigation
} from '@/modules/dashboard/navigation'

import {
  oltNavigation
} from '@/modules/olt/navigation'

import {
  endpointNavigation
} from '@/modules/endpoint/navigation'

import {
  telegramNavigation
} from '@/modules/telegram/navigation'

import {
  telegramBotNavigation
} from '@/modules/telegram-bot/navigation'

import {
  onuNavigation
} from '@/modules/onu/navigation'

import {
  onuReplacementNavigation
} from '@/modules/onu-replacement/navigation'

import {
  systemLogsNavigation
} from '@/modules/system-logs/navigation'
import { userManagementNavigation } from '@/modules/user-management/navigation'

export const sidebarConfig:
  NavigationSection[] = [
  dashboardNavigation,
  userManagementNavigation,
  oltNavigation,
  endpointNavigation,
  telegramNavigation,
  telegramBotNavigation,
  onuNavigation,
  onuReplacementNavigation,
  systemLogsNavigation,
]