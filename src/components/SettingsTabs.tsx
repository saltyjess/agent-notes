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
      display: 'inline-flex',
      backgroundColor: '#f3f4f6',
      borderRadius: '10px',
      padding: '4px',
      marginBottom: '32px',
      gap: '2px',
    }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: tab.id === activeTab ? 500 : 400,
            cursor: 'pointer',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: tab.id === activeTab ? 'white' : 'transparent',
            color: tab.id === activeTab ? '#1f2532' : '#6b7280',
            boxShadow: tab.id === activeTab ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
            transition: 'all 0.15s ease',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default SettingsTabs
