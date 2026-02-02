import { useState, useEffect } from 'react'
import { X } from '@phosphor-icons/react'
import { Note, NoteType, FILTER_OPTIONS, VENDOR_OPTIONS } from '../types'
import { Button } from './ui/button'
import { Switch } from './ui/switch'

interface NoteModalProps {
  note: Note | null
  noteType: NoteType
  onSave: (data: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void
  onClose: () => void
}

const typeLabels: Record<NoteType, string> = {
  vendor: 'Vendor Note',
  trip: 'Trip Note',
  company: 'Company Note',
}

function NoteModal({ note, noteType, onSave, onClose }: NoteModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [vendor, setVendor] = useState('')
  const [filters, setFilters] = useState<string[]>([])
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setDescription(note.description)
      setVendor(note.vendor || '')
      setFilters(note.filters)
      setEnabled(note.enabled)
    } else {
      setTitle('')
      setDescription('')
      setVendor('')
      setFilters([])
      setEnabled(true)
    }
  }, [note])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      type: noteType,
      title: noteType === 'vendor' && vendor ? vendor : title,
      description,
      vendor: noteType === 'vendor' ? vendor : undefined,
      filters,
      enabled,
    })
  }

  const handleFilterToggle = (filterId: string) => {
    setFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    )
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center p-6 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {note ? 'Edit' : 'New'} {typeLabels[noteType]}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {noteType === 'vendor' ? (
            <div>
              <label htmlFor="vendor" className="block text-sm font-medium text-gray-700 mb-1.5">
                Vendor *
              </label>
              <select
                id="vendor"
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              >
                <option value="">Select a vendor...</option>
                {VENDOR_OPTIONS.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">
                Title *
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., International travel policy"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
          )}

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">
              Note Content *
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter the note that will be displayed to travelers..."
              rows={4}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Conditions
            </label>
            <p className="text-sm text-gray-500 mb-3">
              Select when this note should be displayed
            </p>
            <div className="flex flex-wrap gap-2">
              {FILTER_OPTIONS.map(filter => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => handleFilterToggle(filter.id)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors border ${
                    filters.includes(filter.id)
                      ? 'border-sky-500'
                      : 'border-transparent'
                  }`}
                  style={{
                    backgroundColor: filters.includes(filter.id) ? filter.color : '#f3f4f6',
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="enabled"
              checked={enabled}
              onCheckedChange={setEnabled}
            />
            <label htmlFor="enabled" className="text-sm text-gray-700">
              Note is active
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {note ? 'Save Changes' : 'Create Note'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NoteModal
