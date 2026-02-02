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
      gap: '4px',
      borderBottom: '1px solid #e5e7eb',
      paddingBottom: '12px',
      marginBottom: '24px',
    }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            border: tab.id === activeTab ? '1px solid #e5e7eb' : 'none',
            backgroundColor: tab.id === activeTab ? '#f3f4f6' : 'transparent',
            color: tab.id === activeTab ? '#1f2532' : '#5c6370',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default SettingsTabs
