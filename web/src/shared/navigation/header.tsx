import {
  MobileSidebar
} from './mobile-sidebar'

export function Header() {

  return (

    <header
      className="
        sticky
        top-0
        z-40
        flex
        h-14
        items-center
        justify-between
        border-b
        bg-background
        px-4
      "
    >

      <div
        className="
          flex
          items-center
          gap-2
        "
      >

        <div
          className="
            lg:hidden
          "
        >

          <MobileSidebar />

        </div>

        <span
          className="
            font-semibold
          "
        >
          NMS
        </span>

      </div>

    </header>
  )
}