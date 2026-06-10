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
  LogoutButton
} from '@/modules/auth/components/logout-button'

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

        <div
          className="
            border-b
            p-6
          "
        >

          <h1
            className="
              text-xl
              font-bold
            "
          >
            NMS
          </h1>

          <p
            className="
              text-sm
              text-muted-foreground
            "
          >
            Network Management
          </p>

        </div>

        <SidebarContent />

        <div
          className="
            border-t
            p-4
          "
        >

          <LogoutButton />

        </div>

      </SheetContent>

    </Sheet>
  )
}