import { MagnifyingGlass, ArrowsClockwise, CaretDown } from "@phosphor-icons/react"

function Header() {
  return (
    <header className="h-14 border-b border-gray-200 bg-white flex items-center justify-end gap-4 px-6">
      {/* Search */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 bg-gray-50 text-gray-500 text-sm">
        <MagnifyingGlass size={16} />
        <span>Search...</span>
        <kbd className="ml-2 px-1.5 py-0.5 text-xs bg-white border border-gray-200 rounded">⌘K</kbd>
      </div>

      {/* Sync button */}
      <button className="p-2 rounded-md hover:bg-gray-100 text-gray-500 transition-colors">
        <ArrowsClockwise size={20} />
      </button>

      {/* User profile */}
      <button className="flex items-center gap-2 hover:bg-gray-100 rounded-md px-2 py-1 transition-colors">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face"
          alt="User avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="text-left">
          <div className="text-sm font-medium text-gray-900">Debbie Studebaker</div>
          <div className="text-xs text-gray-500">Utah Jazz</div>
        </div>
        <CaretDown size={16} className="text-gray-400" />
      </button>
    </header>
  )
}

export default Header
