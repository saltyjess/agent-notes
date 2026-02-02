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
    <div className="flex gap-1 border-b border-gray-200 pb-3 mb-6">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            tab.id === activeTab
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default SettingsTabs
