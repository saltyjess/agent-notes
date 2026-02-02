import { DotsThreeVertical, Notebook } from "@phosphor-icons/react"
import { Note, FILTER_OPTIONS } from '../types'
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
  'Delta': { bg: '#1e3a8a', text: '#fff', icon: '▶' },
  'Alaska Airlines': { bg: '#0ea5e9', text: '#fff', icon: 'A' },
  'Alaskan Airlines': { bg: '#0ea5e9', text: '#fff', icon: 'A' },
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
          `<a href="#" style="color: #0076a1; text-decoration: none;">${pattern}</a>`
        )
      }
    })
    return result
  }

  // For vendor notes, show vendor name as tag; for trip notes, show filter tags
  const isVendorNote = note.type === 'vendor'

  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '16px',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '8px',
        marginBottom: '8px',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flex: 1, minWidth: 0 }}>
          {/* Icon */}
          {isVendorNote && note.vendor ? (
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '10px',
                fontWeight: 700,
                backgroundColor: vendorColor?.bg || '#6b7280',
                color: vendorColor?.text || '#fff',
              }}
            >
              {vendorColor?.icon || note.vendor.charAt(0)}
            </div>
          ) : (
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '4px',
              backgroundColor: '#e0f4fc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Notebook size={14} style={{ color: '#0076a1' }} weight="fill" />
            </div>
          )}

          {/* Title */}
          <h3 style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#1f2532',
            lineHeight: 1.4,
            paddingTop: '3px',
            margin: 0,
          }}>{note.title}</h3>
        </div>

        {/* Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button style={{
              padding: '2px',
              borderRadius: '4px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
            }}>
              <DotsThreeVertical size={18} weight="bold" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} style={{ color: '#dc2626' }}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: '14px',
          color: '#6b7280',
          marginBottom: '12px',
          lineHeight: 1.5,
          margin: '0 0 12px 0',
        }}
        dangerouslySetInnerHTML={{ __html: formatDescription(note.description) }}
      />

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {isVendorNote && note.vendor ? (
          // Vendor notes show vendor name as single tag
          <span style={{
            fontSize: '12px',
            fontWeight: 500,
            padding: '4px 8px',
            borderRadius: '6px',
            backgroundColor: '#f3f4f6',
            color: '#374151',
          }}>
            {note.vendor}
          </span>
        ) : (
          // Trip notes show filter tags
          filterLabels.map(filter => (
            <span
              key={filter.id}
              style={{
                fontSize: '12px',
                fontWeight: 500,
                padding: '4px 8px',
                borderRadius: '6px',
                backgroundColor: filter.color,
                color: '#374151',
              }}
            >
              {filter.label}
            </span>
          ))
        )}
      </div>
    </div>
  )
}

export default NoteCard
