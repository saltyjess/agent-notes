import { MagnifyingGlass, ArrowsClockwise, CaretDown } from "@phosphor-icons/react"

const VERSION_BAR_HEIGHT = 56

function Header() {
  return (
    <header style={{
      position: 'fixed',
      top: `${VERSION_BAR_HEIGHT}px`,
      left: 0,
      right: 0,
      height: '64px',
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      zIndex: 100,
    }}>
      {/* Logo */}
      <img
        src="/images/andavo-logo.svg"
        alt="Andavo"
        style={{ height: '20px' }}
      />

      {/* Right side items */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}>
        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          backgroundColor: 'white',
          color: '#9ca3af',
          fontSize: '14px',
          cursor: 'pointer',
          minWidth: '140px',
        }}>
          <MagnifyingGlass size={16} weight="regular" />
          <span>Search...</span>
          <kbd style={{
            marginLeft: 'auto',
            padding: '2px 6px',
            fontSize: '11px',
            color: '#9ca3af',
            backgroundColor: '#f3f4f6',
            border: '1px solid #e5e7eb',
            borderRadius: '4px',
            fontWeight: 500,
          }}>⌘K</kbd>
        </div>

        {/* Sync button */}
        <button style={{
          padding: '8px',
          borderRadius: '8px',
          backgroundColor: 'transparent',
          border: 'none',
          color: '#0891b2',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <ArrowsClockwise size={20} weight="regular" />
        </button>

        {/* User profile */}
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '4px 8px',
          borderRadius: '8px',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}>
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face"
            alt="User avatar"
            style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '14px', fontWeight: 500, color: '#1f2532' }}>Debbie Studebaker</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>Utah Jazz</div>
          </div>
          <CaretDown size={14} style={{ color: '#9ca3af' }} weight="bold" />
        </button>
      </div>
    </header>
  )
}

export default Header
