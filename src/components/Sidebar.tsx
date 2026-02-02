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
    <aside className="w-[200px] bg-white border-r border-gray-200 fixed top-0 left-0 bottom-0 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 h-14 border-b border-gray-100">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="12" fill="#0ea5e9"/>
          <path d="M7 12C7 9.5 9 7.5 12 7.5C15 7.5 17 9.5 17 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="12" cy="16" r="2" fill="white"/>
        </svg>
        <span className="text-base font-semibold text-[#1f2532]">andavo</span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col gap-0.5 px-3 py-3">
        {mainNavItems.map(item => {
          const Icon = item.icon
          return (
            <a
              key={item.id}
              href="#"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? 'bg-[#e0f4fc] text-[#0076a1]'
                  : 'text-[#5c6370] hover:bg-gray-100 hover:text-[#1f2532]'
              }`}
            >
              <Icon size={20} weight={item.active ? "fill" : "regular"} />
              <span>{item.label}</span>
            </a>
          )
        })}

        {/* Deem section */}
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#5c6370] hover:bg-gray-100 hover:text-[#1f2532] mt-1"
        >
          <div className="w-5 h-5 rounded bg-[#00a86b] flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">D</span>
          </div>
          <span>Deem</span>
        </a>
      </nav>

      {/* Support */}
      <div className="px-3 py-3 border-t border-gray-100">
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#5c6370] hover:bg-gray-100 hover:text-[#1f2532]"
        >
          <Lifebuoy size={20} weight="regular" />
          <span>Support</span>
        </a>
      </div>
    </aside>
  )
}

export default Sidebar
