import { Link } from 'react-router-dom'
import { LogoutButton } from '../../modules/auth/components/logout-button'

export function Sidebar() {
  return (
    <aside
      style={{
        width: '240px',
        minHeight: '100vh',
        padding: '16px',
        borderRight: '1px solid #ddd'
      }}
    >
      <h2>NMS</h2>

      <nav>
        <ul
          style={{
            listStyle: 'none',
            padding: 0
          }}
        >
          <li>
            <Link to="/dashboard">
              Dashboard
            </Link>
          </li>

          <br />

          <li>
            <strong>
              Network
            </strong>
          </li>

          <li>
            <Link to="/olt">
              OLT
            </Link>
          </li>

          <li>
            <Link to="/onu">
              ONU
            </Link>
          </li>

          <br />

          <li>
            <strong>
              Customer
            </strong>
          </li>

          <li>
            <Link to="/endpoint">
              Endpoint
            </Link>
          </li>

          <br />

          <li>
            <strong>
              Monitoring
            </strong>
          </li>

          <li>
            <Link to="/alarm">
              Alarm
            </Link>
          </li>

          <br />

          <li>
            <strong>
              System
            </strong>
          </li>

          <li>
            <Link to="/users">
              Users
            </Link>
          </li>
        </ul>
        <div
            style={{
                marginTop: '40px'
            }}
            >
            <LogoutButton />
        </div>

      </nav>
    </aside>
  )
}