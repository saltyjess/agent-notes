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
    <section className="bg-white border border-gray-200 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          Add new
          <Plus size={16} weight="bold" />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <div className="col-span-full text-center py-8 text-gray-400">
            <p>No notes yet. Click "Add new +" to create one.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default NotesSection
