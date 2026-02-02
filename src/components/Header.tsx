import { MagnifyingGlass, ArrowsClockwise, CaretDown } from "@phosphor-icons/react"

function Header() {
  return (
    <header style={{
      height: '56px',
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '12px',
      padding: '0 24px',
    }}>
      {/* Search */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        backgroundColor: '#f8f9fa',
        color: '#6b7280',
        fontSize: '14px',
        cursor: 'pointer',
      }}>
        <MagnifyingGlass size={16} weight="regular" />
        <span>Search...</span>
        <kbd style={{
          marginLeft: '4px',
          padding: '2px 6px',
          fontSize: '11px',
          color: '#6b7280',
          backgroundColor: 'white',
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
        color: '#0076a1',
        cursor: 'pointer',
      }}>
        <ArrowsClockwise size={20} weight="regular" />
      </button>

      {/* User profile */}
      <button style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '6px 8px',
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
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#1f2532' }}>Debbie Studebaker</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Utah Jazz</div>
        </div>
        <CaretDown size={16} style={{ color: '#5c6370' }} weight="bold" />
      </button>
    </header>
  )
}

export default Header
