import { Plus, TextAa, TextB, TextItalic, ListBullets, Link } from "@phosphor-icons/react"
import { Note, FILTER_OPTIONS } from '../types'
import { Switch } from './ui/switch'

interface CompanyNotesSectionProps {
  notes: Note[]
  onAdd: () => void
  onEdit: (note: Note) => void
  onDelete: (id: string) => void
  onToggle: (id: string) => void
}

function CompanyNotesSection({ notes, onToggle }: CompanyNotesSectionProps) {
  const toggleNotes = notes.filter(n =>
    ['Direct bill', 'Rate assurance', 'Virtual payments'].includes(n.title)
  )

  const formatDescription = (text: string) => {
    const linkPatterns = ['useful guide', 'company policies', 'Read our useful guide']
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

  const getFilterLabels = (filterIds: string[]) => {
    return filterIds.map(filterId => {
      const filter = FILTER_OPTIONS.find(f => f.id === filterId)
      return filter || { id: filterId, label: filterId, color: '#f3f4f6' }
    })
  }

  return (
    <section style={{
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '24px',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '20px',
      }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1f2532', margin: 0 }}>Company notes</h2>
          <p style={{ fontSize: '14px', color: '#5c6370', marginTop: '2px', margin: 0 }}>Notes integrated in the itineraries</p>
        </div>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '14px',
          fontWeight: 500,
          color: '#5c6370',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}>
          Add new
          <Plus size={16} weight="bold" />
        </button>
      </div>

      {/* Rich text areas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {/* Policy text area */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: 500, color: '#1f2532' }}>
              Policy displayed on itinerary (this name needs reworking)
            </label>
            <span style={{ fontSize: '12px', color: '#9ca3af' }}>Optional</span>
          </div>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <textarea
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '14px',
                color: '#5c6370',
                resize: 'none',
                border: 'none',
                outline: 'none',
                backgroundColor: 'white',
                boxSizing: 'border-box',
              }}
              rows={4}
              defaultValue="Please review all trip details carefully to ensure dates, names, and arrangements are correct."
            />
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              padding: '8px 12px',
              borderTop: '1px solid #f3f4f6',
              backgroundColor: '#f8f9fa',
            }}>
              <button style={{ padding: '6px', borderRadius: '4px', backgroundColor: 'transparent', border: 'none', color: '#5c6370', cursor: 'pointer' }}>
                <TextAa size={16} />
              </button>
              <button style={{ padding: '6px', borderRadius: '4px', backgroundColor: 'transparent', border: 'none', color: '#5c6370', cursor: 'pointer' }}>
                <TextB size={16} weight="bold" />
              </button>
              <button style={{ padding: '6px', borderRadius: '4px', backgroundColor: 'transparent', border: 'none', color: '#5c6370', cursor: 'pointer' }}>
                <TextItalic size={16} />
              </button>
              <button style={{ padding: '6px', borderRadius: '4px', backgroundColor: 'transparent', border: 'none', color: '#5c6370', cursor: 'pointer' }}>
                <ListBullets size={16} />
              </button>
              <button style={{ padding: '6px', borderRadius: '4px', backgroundColor: 'transparent', border: 'none', color: '#5c6370', cursor: 'pointer' }}>
                <Link size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Fine print text area */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: 500, color: '#1f2532' }}>
              Fine print displayed on itinerary (this name needs reworking)
            </label>
            <span style={{ fontSize: '12px', color: '#9ca3af' }}>Optional</span>
          </div>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <textarea
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '14px',
                color: '#5c6370',
                resize: 'none',
                border: 'none',
                outline: 'none',
                backgroundColor: 'white',
                boxSizing: 'border-box',
              }}
              rows={4}
              defaultValue="By flying with our company you agree to represent our company and follow our standards listed in the company policies."
            />
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              padding: '8px 12px',
              borderTop: '1px solid #f3f4f6',
              backgroundColor: '#f8f9fa',
            }}>
              <button style={{ padding: '6px', borderRadius: '4px', backgroundColor: 'transparent', border: 'none', color: '#5c6370', cursor: 'pointer' }}>
                <TextAa size={16} />
              </button>
              <button style={{ padding: '6px', borderRadius: '4px', backgroundColor: 'transparent', border: 'none', color: '#5c6370', cursor: 'pointer' }}>
                <TextB size={16} weight="bold" />
              </button>
              <button style={{ padding: '6px', borderRadius: '4px', backgroundColor: 'transparent', border: 'none', color: '#5c6370', cursor: 'pointer' }}>
                <TextItalic size={16} />
              </button>
              <button style={{ padding: '6px', borderRadius: '4px', backgroundColor: 'transparent', border: 'none', color: '#5c6370', cursor: 'pointer' }}>
                <ListBullets size={16} />
              </button>
              <button style={{ padding: '6px', borderRadius: '4px', backgroundColor: 'transparent', border: 'none', color: '#5c6370', cursor: 'pointer' }}>
                <Link size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle items */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {toggleNotes.map(note => {
          const filterLabels = getFilterLabels(note.filters)
          return (
            <div key={note.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
                <Switch
                  checked={note.enabled}
                  onCheckedChange={() => onToggle(note.id)}
                />
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1f2532', margin: 0 }}>{note.title}</h3>
              </div>
              <p
                style={{
                  fontSize: '13px',
                  lineHeight: 1.5,
                  marginBottom: '12px',
                  color: note.enabled ? '#5c6370' : '#9ca3af',
                  margin: '0 0 12px 0',
                }}
                dangerouslySetInnerHTML={{ __html: formatDescription(note.description) }}
              />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {filterLabels.map(filter => (
                  <span
                    key={filter.id}
                    style={{
                      fontSize: '11px',
                      fontWeight: 500,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: filter.color,
                      color: '#374151',
                      opacity: note.enabled ? 1 : 0.5,
                    }}
                  >
                    {filter.label}
                  </span>
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
