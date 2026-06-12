import {
  Outlet
} from 'react-router-dom'

import {
  Sidebar
} from '../navigation/sidebar'

import {
  Header
} from '../navigation/header'

import {
  Footer
} from '../navigation/footer'

export function DashboardLayout() {

  return (

    <div
      className="
        flex
        h-screen
        overflow-hidden
      "
    >

      <div
        className="
          hidden
          lg:block
        "
      >

        <Sidebar />

      </div>

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
        "
      >

        <Header />

        <main
          className="
            min-h-0
            flex-1
            overflow-y-auto
          "
        >

          <Outlet />

        </main>

        <Footer />

      </div>

    </div>
  )
}