import {
  House,
  Compass,
  UsersThree,
  Receipt,
  ChartLineUp,
  Gear,
  Question,
} from "@phosphor-icons/react"

const mainNavItems = [
  { id: 'home', label: 'Home', icon: House },
  { id: 'trips', label: 'Trips', icon: Compass },
  { id: 'people', label: 'People', icon: UsersThree },
  { id: 'expense', label: 'Expense', icon: Receipt },
  { id: 'reports', label: 'Reports', icon: ChartLineUp },
  { id: 'settings', label: 'Settings', icon: Gear, active: true },
]

const VERSION_BAR_HEIGHT = 56
const HEADER_HEIGHT = 64

function Sidebar() {
  return (
    <aside style={{
      width: '200px',
      minWidth: '200px',
      backgroundColor: 'white',
      borderRight: '1px solid #e5e7eb',
      position: 'fixed',
      top: `${VERSION_BAR_HEIGHT + HEADER_HEIGHT}px`,
      left: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      zIndex: 50,
      paddingTop: '8px',
    }}>
      {/* Main Navigation */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', padding: '8px 12px' }}>
        {mainNavItems.map(item => {
          const Icon = item.icon
          return (
            <a
              key={item.id}
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: item.active ? 500 : 400,
                textDecoration: 'none',
                backgroundColor: item.active ? '#1f2532' : 'transparent',
                color: item.active ? 'white' : '#1f2532',
                position: 'relative',
              }}
            >
              {item.active && (
                <div style={{
                  position: 'absolute',
                  left: '-12px',
                  top: '6px',
                  bottom: '6px',
                  width: '0',
                  borderLeft: '2px dashed #d1d5db',
                }} />
              )}
              <Icon size={20} weight={item.active ? "fill" : "regular"} />
              <span>{item.label}</span>
            </a>
          )
        })}

        {/* Deem section */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 12px',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: 400,
            textDecoration: 'none',
            color: '#1f2532',
            marginTop: '8px',
          }}
        >
          <div style={{
            width: '20px',
            height: '20px',
            borderRadius: '4px',
            backgroundColor: '#0066cc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ color: 'white', fontSize: '11px', fontWeight: 700 }}>D</span>
          </div>
          <span>Deem</span>
        </a>
      </nav>

      {/* Support */}
      <div style={{ padding: '8px 12px', borderTop: '1px solid #f3f4f6' }}>
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 12px',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: 400,
            textDecoration: 'none',
            color: '#1f2532',
          }}
        >
          <Question size={20} weight="regular" />
          <span>Support</span>
        </a>
      </div>
    </aside>
  )
}

export default Sidebar
