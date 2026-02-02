import { DotsThreeVertical, Notebook } from "@phosphor-icons/react"
import { Note, FILTER_OPTIONS } from '../types'
import { Badge } from './ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface NoteCardProps {
  note: Note
  onEdit: () => void
  onDelete: () => void
  onToggle: () => void
}

// Vendor brand colors for icons
const vendorColors: Record<string, { bg: string; text: string; icon?: string }> = {
  'Hertz': { bg: '#fbbf24', text: '#000', icon: 'H' },
  'Air China': { bg: '#dc2626', text: '#fff', icon: '🌸' },
  'Delta': { bg: '#1e3a8a', text: '#fff', icon: '▲' },
  'Alaska Airlines': { bg: '#0369a1', text: '#fff', icon: 'A' },
  'Alaskan Airlines': { bg: '#0369a1', text: '#fff', icon: 'A' },
  'United': { bg: '#1d4ed8', text: '#fff', icon: 'U' },
  'American Airlines': { bg: '#dc2626', text: '#fff', icon: 'AA' },
  'Southwest': { bg: '#f59e0b', text: '#000', icon: 'SW' },
  'Marriott': { bg: '#7c3aed', text: '#fff', icon: 'M' },
  'Hilton': { bg: '#0891b2', text: '#fff', icon: 'H' },
  'Hyatt': { bg: '#059669', text: '#fff', icon: 'H' },
  'Enterprise': { bg: '#16a34a', text: '#fff', icon: 'E' },
  'National': { bg: '#15803d', text: '#fff', icon: 'N' },
  'Avis': { bg: '#dc2626', text: '#fff', icon: 'A' },
  'Budget': { bg: '#ea580c', text: '#fff', icon: 'B' },
}

function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const filterLabels = note.filters.map(filterId => {
    const filter = FILTER_OPTIONS.find(f => f.id === filterId)
    return filter || { id: filterId, label: filterId, color: '#f3f4f6' }
  })

  const vendorColor = note.vendor ? vendorColors[note.vendor] : null

  // Format description to highlight links
  const formatDescription = (text: string) => {
    const linkPatterns = [
      'Visa Policy',
      'View details',
      'Join now',
      'useful guide',
      'company policies',
    ]

    let result = text
    linkPatterns.forEach(pattern => {
      if (result.includes(pattern)) {
        result = result.replace(
          pattern,
          `<a href="#" class="text-[#0076a1] hover:underline">${pattern}</a>`
        )
      }
    })
    return result
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-start gap-2.5 flex-1 min-w-0">
          {/* Icon */}
          {note.type === 'vendor' && note.vendor ? (
            <div
              className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
              style={{
                backgroundColor: vendorColor?.bg || '#6b7280',
                color: vendorColor?.text || '#fff',
              }}
            >
              {vendorColor?.icon || note.vendor.charAt(0)}
            </div>
          ) : (
            <div className="w-6 h-6 rounded bg-[#e0f4fc] flex items-center justify-center flex-shrink-0">
              <Notebook size={14} className="text-[#0076a1]" weight="fill" />
            </div>
          )}

          {/* Title */}
          <h3 className="text-sm font-semibold text-[#1f2532] leading-tight pt-0.5">{note.title}</h3>
        </div>

        {/* Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-0.5 rounded hover:bg-gray-100 text-[#9ca3af] hover:text-[#5c6370] transition-colors -mr-1">
              <DotsThreeVertical size={18} weight="bold" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-red-600 focus:text-red-600">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Description */}
      <p
        className="text-[13px] text-[#5c6370] mb-3 leading-relaxed line-clamp-3"
        dangerouslySetInnerHTML={{ __html: formatDescription(note.description) }}
      />

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {filterLabels.map(filter => (
          <Badge
            key={filter.id}
            variant="secondary"
            className="text-[11px] font-medium px-2 py-0.5 rounded"
            style={{ backgroundColor: filter.color, color: '#374151' }}
          >
            {filter.label}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default NoteCard
