import {
  Menu
} from 'lucide-react'

import {
  Button
} from '@/components/ui/button'

import {

  Sheet,

  SheetContent,

  SheetTrigger,

  SheetHeader,

  SheetTitle,

  SheetDescription

} from '@/components/ui/sheet'

import {
  SidebarContent
} from './sidebar-content'

import {
  UserMenu,
} from '@/modules/users/components/user-menu'
import { SidebarBrand } from './sidebar-brand'

export function MobileSidebar() {

  return (

    <Sheet>

      <SheetTrigger
        asChild
      >

        <Button
          size="icon"
          variant="ghost"
        >

          <Menu
            className="
              h-5
              w-5
            "
          />

        </Button>

      </SheetTrigger>

      <SheetContent

        side="left"

        className="
          flex
          w-72
          flex-col
          p-0
        "
      >

        <SheetHeader
          className="sr-only"
        >

          <SheetTitle>
            Navigation Menu
          </SheetTitle>

          <SheetDescription>
            Main application navigation
          </SheetDescription>

        </SheetHeader>

        <SidebarBrand />

        <SidebarContent />

        <div
          className="
            border-t
            p-4
          "
        >

          <UserMenu />

        </div>

      </SheetContent>

    </Sheet>
  )
}