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
      top: 0,
      left: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '0 16px',
        height: '56px',
        borderBottom: '1px solid #f3f4f6',
      }}>
        <svg width="24" height="24" viewBox="0 0 32 34" fill="none">
          <path d="M31.0132 17.6122C31.0132 17.6122 29.6145 13.6206 25.942 10.819C26.5345 12.2742 26.9273 13.8586 27.0995 15.545C27.5956 16.191 28.3811 17.619 28.3811 17.619C27.637 19.183 26.5828 20.5158 25.3356 21.6038C27.1753 13.3146 23.3581 5.11376 15.5032 2.33936C15.5032 2.33936 11.4586 3.71976 8.61976 7.34417C10.0943 6.75937 11.6997 6.37177 13.4016 6.20176C14.0562 5.71216 15.5032 4.93016 15.5032 4.93016C17.0948 5.66456 18.4384 6.70497 19.5409 7.94257C11.1416 6.10656 2.81813 9.87377 0 17.6394C0 17.6394 1.39873 21.631 5.07126 24.4326C4.47869 22.9774 4.08595 21.393 3.91369 19.7066C3.41759 19.0606 2.6252 17.6326 2.6252 17.6326C3.37625 16.055 4.43046 14.7222 5.69139 13.6342C3.83101 21.937 7.64134 30.1582 15.517 32.9394C15.517 32.9394 19.5616 31.559 22.4004 27.9346C20.9258 28.5194 19.3204 28.907 17.6185 29.077C16.9639 29.5666 15.517 30.3486 15.517 30.3486C13.9115 29.6074 12.5541 28.5534 11.4517 27.3022C19.8647 29.145 28.1951 25.3778 31.0201 17.6122H31.0132ZM9.233 23.8614C7.48286 19.9854 7.42085 15.3138 9.18477 11.4514C13.1122 9.72417 17.8597 9.64937 21.7733 11.3902C23.5235 15.2594 23.6062 19.931 21.856 23.7934C17.9217 25.5342 13.1605 25.609 9.23989 23.8682L9.233 23.8614Z" fill="#00B4A0"/>
        </svg>
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#1f2532', letterSpacing: '-0.01em' }}>andavo</span>
      </div>

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
                gap: '10px',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 500,
                textDecoration: 'none',
                backgroundColor: item.active ? '#e0f4fc' : 'transparent',
                color: item.active ? '#0076a1' : '#5c6370',
              }}
            >
              <Icon size={18} weight={item.active ? "fill" : "regular"} />
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
            gap: '10px',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 500,
            textDecoration: 'none',
            color: '#5c6370',
            marginTop: '4px',
          }}
        >
          <div style={{
            width: '18px',
            height: '18px',
            borderRadius: '4px',
            backgroundColor: '#00a86b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ color: 'white', fontSize: '9px', fontWeight: 700 }}>D</span>
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
            gap: '10px',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 500,
            textDecoration: 'none',
            color: '#5c6370',
          }}
        >
          <Lifebuoy size={18} weight="regular" />
          <span>Support</span>
        </a>
      </div>
    </aside>
  )
}

export default Sidebar
