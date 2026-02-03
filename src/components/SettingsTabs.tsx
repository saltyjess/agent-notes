interface SettingsTabsProps {
  activeTab: string
}

const tabs = [
  { id: 'organization', label: 'Organization' },
  { id: 'vendor-management', label: 'Vendor management' },
  { id: 'attributes', label: 'Attributes' },
  { id: 'policy', label: 'Policy' },
  { id: 'workflows', label: 'Workflows' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'itinerary-notes', label: 'Itinerary notes' },
]

function SettingsTabs({ activeTab }: SettingsTabsProps) {
  return (
    <div style={{
      display: 'flex',
      gap: '0',
      marginBottom: '32px',
    }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          style={{
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: 400,
            cursor: 'pointer',
            border: tab.id === activeTab ? '1px solid #e5e7eb' : '1px solid transparent',
            borderBottom: tab.id === activeTab ? '1px solid white' : '1px solid #e5e7eb',
            borderRadius: tab.id === activeTab ? '8px 8px 0 0' : '0',
            backgroundColor: tab.id === activeTab ? 'white' : 'transparent',
            color: tab.id === activeTab ? '#1f2532' : '#6b7280',
            marginBottom: '-1px',
            position: 'relative',
          }}
        >
          {tab.label}
        </button>
      ))}
      <div style={{ flex: 1, borderBottom: '1px solid #e5e7eb' }} />
    </div>
  )
}

export default SettingsTabs
