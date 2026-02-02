import {
  House,
  Globe,
  UsersThree,
  CreditCard,
  ChartBar,
  Gear,
  Lifebuoy,
} from "@phosphor-icons/react"

const mainNavItems = [
  { id: 'home', label: 'Home', icon: House },
  { id: 'trips', label: 'Trips', icon: Globe },
  { id: 'people', label: 'People', icon: UsersThree },
  { id: 'expense', label: 'Expense', icon: CreditCard },
  { id: 'reports', label: 'Reports', icon: ChartBar },
  { id: 'settings', label: 'Settings', icon: Gear, active: true },
]

function Sidebar() {
  return (
    <aside style={{
      width: '200px',
      minWidth: '200px',
      backgroundColor: 'white',
      borderRight: '1px solid #e5e7eb',
      position: 'fixed',
      top: '56px',
      left: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      zIndex: 50,
    }}>
      {/* Main Navigation */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', padding: '12px' }}>
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
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none',
                backgroundColor: item.active ? '#e0f4fc' : 'transparent',
                color: item.active ? '#0076a1' : '#6b7280',
              }}
            >
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
            fontSize: '14px',
            fontWeight: 500,
            textDecoration: 'none',
            color: '#6b7280',
            marginTop: '4px',
          }}
        >
          <div style={{
            width: '20px',
            height: '20px',
            borderRadius: '4px',
            backgroundColor: '#00a86b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ color: 'white', fontSize: '10px', fontWeight: 700 }}>D</span>
          </div>
          <span>Deem</span>
        </a>
      </nav>

      {/* Support */}
      <div style={{ padding: '12px', borderTop: '1px solid #f3f4f6' }}>
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 12px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 500,
            textDecoration: 'none',
            color: '#6b7280',
          }}
        >
          <Lifebuoy size={20} weight="regular" />
          <span>Support</span>
        </a>
      </div>
    </aside>
  )
}

export default Sidebar
