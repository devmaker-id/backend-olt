import { NavLink } from 'react-router-dom'
import { LogoutButton } from '../../modules/auth/components/logout-button'

export function Sidebar() {
  const menuStyle = ({
    isActive
  }: {
    isActive: boolean
  }) => ({
    display: 'block',
    padding: '10px 14px',
    borderRadius: '6px',
    textDecoration: 'none',
    color: isActive ? '#2563eb' : '#374151',
    backgroundColor: isActive
      ? '#eff6ff'
      : 'transparent',
    fontWeight: isActive ? 600 : 400,
    marginBottom: '4px'
  })

  const sectionTitle = {
    fontSize: '12px',
    fontWeight: 600,
    color: '#9ca3af',
    marginTop: '20px',
    marginBottom: '8px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px'
  }

  return (
    <aside
      style={{
        width: '250px',
        height: '100vh',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        boxSizing: 'border-box'
      }}
    >
      {/* Logo */}
      <div
        style={{
          marginBottom: '24px'
        }}
      >
        <h2
          style={{
            margin: 0,
            color: '#111827'
          }}
        >
          NMS
        </h2>

        <small
          style={{
            color: '#6b7280'
          }}
        >
          Network Management
        </small>
      </div>

      <nav
        style={{
          flex: 1
        }}
      >
        <NavLink
          to="/dashboard"
          style={menuStyle}
        >
          Dashboard
        </NavLink>

        <div style={sectionTitle}>
          Network
        </div>

        <NavLink
          to="/olts"
          style={menuStyle}
        >
          OLTs
        </NavLink>

        <div style={sectionTitle}>
          Telegram
        </div>

        <NavLink
          to="/telegram-bots"
          style={menuStyle}
        >
          Telegram Bots
        </NavLink>

        <NavLink
          to="/telegram/users"
          style={menuStyle}
        >
          Telegram Users
        </NavLink>

        <div style={sectionTitle}>
          ONU Management
        </div>

        <NavLink
          to="/onu/unregistered"
          style={menuStyle}
        >
          Unregistered ONU
        </NavLink>

        <NavLink
          to="/onu/replacements"
          style={menuStyle}
        >
          Replacement
        </NavLink>

        <div style={sectionTitle}>
          Customer
        </div>

        <NavLink
          to="/endpoints"
          style={menuStyle}
        >
          Endpoint
        </NavLink>

        <div style={sectionTitle}>
          Sytem Logs
        </div>

        <NavLink
          to="/log/onu"
          style={menuStyle}
        >
          Alarm Onu
        </NavLink>
        <NavLink
          to="/system-logs/telegram-access"
          style={menuStyle}
        >
          Telegram Access
        </NavLink>

        <div style={sectionTitle}>
          System
        </div>

        <NavLink
          to="/users"
          style={menuStyle}
        >
          Users
        </NavLink>
      </nav>

      <div
        style={{
          paddingTop: '16px',
          borderTop: '1px solid #e5e7eb'
        }}
      >
        <LogoutButton />
      </div>
    </aside>
  )
}