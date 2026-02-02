import { Plus } from "@phosphor-icons/react"
import { Note } from '../types'
import NoteCard from './NoteCard'

interface NotesSectionProps {
  title: string
  subtitle: string
  notes: Note[]
  onAdd: () => void
  onEdit: (note: Note) => void
  onDelete: (id: string) => void
  onToggle: (id: string) => void
}

function NotesSection({ title, subtitle, notes, onAdd, onEdit, onDelete, onToggle }: NotesSectionProps) {
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
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1f2532', margin: 0 }}>{title}</h2>
          <p style={{ fontSize: '14px', color: '#5c6370', marginTop: '2px', margin: 0 }}>{subtitle}</p>
        </div>
        <button
          onClick={onAdd}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14px',
            fontWeight: 500,
            color: '#5c6370',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Add new
          <Plus size={16} weight="bold" />
        </button>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
      }}>
        {notes.map(note => (
          <NoteCard
            key={note.id}
            note={note}
            onEdit={() => onEdit(note)}
            onDelete={() => onDelete(note.id)}
            onToggle={() => onToggle(note.id)}
          />
        ))}
        {notes.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '32px', color: '#9ca3af' }}>
            <p>No notes yet. Click "Add new +" to create one.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default NotesSection
