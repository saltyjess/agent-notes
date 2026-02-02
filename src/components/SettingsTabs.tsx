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
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            tab.id === activeTab
              ? 'bg-[#f3f4f6] text-[#1f2532] border border-gray-200'
              : 'text-[#5c6370] hover:text-[#1f2532] hover:bg-[#f8f9fa]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default SettingsTabs
