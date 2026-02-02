import { MagnifyingGlass, ArrowsClockwise, CaretDown } from "@phosphor-icons/react"

function Header() {
  return (
    <header className="h-14 border-b border-gray-200 bg-white flex items-center justify-end gap-3 px-6">
      {/* Search */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-[#f8f9fa] text-[#5c6370] text-sm cursor-pointer hover:border-gray-300 transition-colors">
        <MagnifyingGlass size={16} weight="regular" />
        <span>Search...</span>
        <kbd className="ml-1 px-1.5 py-0.5 text-[11px] text-[#5c6370] bg-white border border-gray-200 rounded font-medium">⌘K</kbd>
      </div>

      {/* Sync button */}
      <button className="p-2 rounded-lg hover:bg-[#f8f9fa] text-[#0076a1] transition-colors">
        <ArrowsClockwise size={20} weight="regular" />
      </button>

      {/* User profile */}
      <button className="flex items-center gap-2.5 hover:bg-[#f8f9fa] rounded-lg px-2 py-1.5 transition-colors">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face"
          alt="User avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="text-left">
          <div className="text-sm font-semibold text-[#1f2532]">Debbie Studebaker</div>
          <div className="text-xs text-[#5c6370]">Utah Jazz</div>
        </div>
        <CaretDown size={16} className="text-[#5c6370]" weight="bold" />
      </button>
    </header>
  )
}

export default Header
