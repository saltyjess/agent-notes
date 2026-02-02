import { DotsThreeVertical, Note as NoteIcon } from "@phosphor-icons/react"
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
const vendorColors: Record<string, { bg: string; text: string }> = {
  'Hertz': { bg: '#fbbf24', text: '#000' },
  'Air China': { bg: '#dc2626', text: '#fff' },
  'Delta': { bg: '#1e40af', text: '#fff' },
  'Alaska Airlines': { bg: '#0369a1', text: '#fff' },
  'United': { bg: '#1d4ed8', text: '#fff' },
  'American Airlines': { bg: '#dc2626', text: '#fff' },
  'Southwest': { bg: '#f59e0b', text: '#000' },
  'Marriott': { bg: '#7c3aed', text: '#fff' },
  'Hilton': { bg: '#0891b2', text: '#fff' },
  'Hyatt': { bg: '#059669', text: '#fff' },
  'Enterprise': { bg: '#16a34a', text: '#fff' },
  'National': { bg: '#15803d', text: '#fff' },
  'Avis': { bg: '#dc2626', text: '#fff' },
  'Budget': { bg: '#ea580c', text: '#fff' },
}

function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const filterLabels = note.filters.map(filterId => {
    const filter = FILTER_OPTIONS.find(f => f.id === filterId)
    return filter || { id: filterId, label: filterId, color: '#e5e7eb' }
  })

  const vendorColor = note.vendor ? vendorColors[note.vendor] : null

  // Format description to highlight links (text containing "Visa Policy", "View details", "Join now", "useful guide", "company policies")
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
          `<a href="#" class="text-sky-600 hover:underline">${pattern}</a>`
        )
      }
    })
    return result
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Icon */}
          {note.type === 'vendor' && note.vendor ? (
            <div
              className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 text-xs font-bold"
              style={{
                backgroundColor: vendorColor?.bg || '#6b7280',
                color: vendorColor?.text || '#fff',
              }}
            >
              {note.vendor.charAt(0)}
            </div>
          ) : (
            <div className="w-6 h-6 rounded bg-sky-100 flex items-center justify-center flex-shrink-0">
              <NoteIcon size={14} className="text-sky-600" />
            </div>
          )}

          {/* Title */}
          <h3 className="text-sm font-semibold text-gray-900 pt-0.5">{note.title}</h3>
        </div>

        {/* Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
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
        className="text-sm text-gray-600 mb-3 line-clamp-3"
        dangerouslySetInnerHTML={{ __html: formatDescription(note.description) }}
      />

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {filterLabels.map(filter => (
          <Badge
            key={filter.id}
            variant="secondary"
            className="text-xs font-medium"
            style={{ backgroundColor: filter.color }}
          >
            {filter.label}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default NoteCard
