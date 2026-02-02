import { Plus, TextAa, TextB, TextItalic, ListBullets, Link } from "@phosphor-icons/react"
import { Note, FILTER_OPTIONS } from '../types'
import { Switch } from './ui/switch'
import { Badge } from './ui/badge'

interface CompanyNotesSectionProps {
  notes: Note[]
  onAdd: () => void
  onEdit: (note: Note) => void
  onDelete: (id: string) => void
  onToggle: (id: string) => void
}

function CompanyNotesSection({ notes, onToggle }: CompanyNotesSectionProps) {
  // Split notes into the "rich text" notes and "toggle" notes based on their content
  const toggleNotes = notes.filter(n =>
    ['Direct bill', 'Rate assurance', 'Virtual payments'].includes(n.title)
  )

  const formatDescription = (text: string) => {
    const linkPatterns = ['useful guide', 'company policies']
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

  const getFilterLabels = (filterIds: string[]) => {
    return filterIds.map(filterId => {
      const filter = FILTER_OPTIONS.find(f => f.id === filterId)
      return filter || { id: filterId, label: filterId, color: '#e5e7eb' }
    })
  }

  return (
    <section className="bg-white border border-gray-200 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Company notes</h2>
          <p className="text-sm text-gray-500 mt-0.5">Notes integrated in the itineraries</p>
        </div>
        <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
          Add new
          <Plus size={16} weight="bold" />
        </button>
      </div>

      {/* Rich text areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Policy text area */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              Policy displayed on itinerary (this name needs reworking)
            </label>
            <span className="text-xs text-gray-400">Optional</span>
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <textarea
              className="w-full p-3 text-sm text-gray-700 resize-none border-none focus:outline-none focus:ring-0"
              rows={4}
              defaultValue="Please review all trip details carefully to ensure dates, names, and arrangements are correct."
            />
            <div className="flex items-center gap-1 px-3 py-2 border-t border-gray-100 bg-gray-50">
              <button className="p-1.5 rounded hover:bg-gray-200 text-gray-500 transition-colors">
                <TextAa size={16} />
              </button>
              <button className="p-1.5 rounded hover:bg-gray-200 text-gray-500 transition-colors">
                <TextB size={16} weight="bold" />
              </button>
              <button className="p-1.5 rounded hover:bg-gray-200 text-gray-500 transition-colors">
                <TextItalic size={16} />
              </button>
              <button className="p-1.5 rounded hover:bg-gray-200 text-gray-500 transition-colors">
                <ListBullets size={16} />
              </button>
              <button className="p-1.5 rounded hover:bg-gray-200 text-gray-500 transition-colors">
                <Link size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Fine print text area */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              Fine print displayed on itinerary (this name needs reworking)
            </label>
            <span className="text-xs text-gray-400">Optional</span>
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <textarea
              className="w-full p-3 text-sm text-gray-700 resize-none border-none focus:outline-none focus:ring-0"
              rows={4}
              defaultValue="By flying with our company you agree to represent our company and follow our standards listed in the company policies."
            />
            <div className="flex items-center gap-1 px-3 py-2 border-t border-gray-100 bg-gray-50">
              <button className="p-1.5 rounded hover:bg-gray-200 text-gray-500 transition-colors">
                <TextAa size={16} />
              </button>
              <button className="p-1.5 rounded hover:bg-gray-200 text-gray-500 transition-colors">
                <TextB size={16} weight="bold" />
              </button>
              <button className="p-1.5 rounded hover:bg-gray-200 text-gray-500 transition-colors">
                <TextItalic size={16} />
              </button>
              <button className="p-1.5 rounded hover:bg-gray-200 text-gray-500 transition-colors">
                <ListBullets size={16} />
              </button>
              <button className="p-1.5 rounded hover:bg-gray-200 text-gray-500 transition-colors">
                <Link size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {toggleNotes.map(note => {
          const filterLabels = getFilterLabels(note.filters)
          return (
            <div key={note.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-2">
                <Switch
                  checked={note.enabled}
                  onCheckedChange={() => onToggle(note.id)}
                />
                <h3 className="text-sm font-semibold text-gray-900">{note.title}</h3>
              </div>
              <p
                className={`text-sm mb-3 ${note.enabled ? 'text-gray-600' : 'text-gray-400'}`}
                dangerouslySetInnerHTML={{ __html: formatDescription(note.description) }}
              />
              <div className="flex flex-wrap gap-1.5">
                {filterLabels.map(filter => (
                  <Badge
                    key={filter.id}
                    variant="secondary"
                    className={`text-xs font-medium ${!note.enabled ? 'opacity-50' : ''}`}
                    style={{ backgroundColor: filter.color }}
                  >
                    {filter.label}
                  </Badge>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default CompanyNotesSection
