import { useState, useEffect } from 'react'
import { Note, NoteType } from './types'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import SettingsTabs from './components/SettingsTabs'
import NotesSection from './components/NotesSection'
import CompanyNotesSection from './components/CompanyNotesSection'
import NoteModal from './components/NoteModal'

const STORAGE_KEY = 'agent-notes-data'

const defaultNotes: Note[] = [
  {
    id: '1',
    type: 'vendor',
    title: 'Hertz',
    description: 'THIS CAR RENTAL IS NON REFUNDABLE AND CHANGES MAY INCUR ADDITIONAL COST. CANCELLATION IF ALLOWED IS REQUIRED AT LEAST 24 HOURS PRIOR.',
    enabled: true,
    vendor: 'Hertz',
    filters: ['all-itineraries'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    type: 'vendor',
    title: 'Air China',
    description: 'You need to be compliant with our Chinese travel Visa Policy in order to board with Air China.',
    enabled: true,
    vendor: 'Air China',
    filters: ['international'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    type: 'vendor',
    title: 'Delta',
    description: 'New loyalty members get 70,000 Skymiles View details',
    enabled: true,
    vendor: 'Delta',
    filters: ['itineraries-with-air'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    type: 'vendor',
    title: 'Alaskan Airlines',
    description: 'New loyalty members get 40,000 air-miles Join now',
    enabled: true,
    vendor: 'Alaska Airlines',
    filters: ['itineraries-with-air'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    type: 'trip',
    title: 'For international travelers',
    description: 'Valid passport is required for all international flights. Passport must be valid at least 6 months past your return date....',
    enabled: true,
    filters: ['all-itineraries', 'international'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    type: 'trip',
    title: 'How to pay with a virtual card',
    description: 'If this trip uses a virtual credit card for payment. Read our useful guide to ensure proper payment acceptance.',
    enabled: true,
    filters: ['itineraries-with-hotel', 'domestic', 'international'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    type: 'trip',
    title: 'In case of an accident in your rental c...',
    description: '1. Report accident to local law enforcement as required\n2. Initiate a claim with car rental company...',
    enabled: true,
    filters: ['itineraries-with-car', 'domestic'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    type: 'trip',
    title: 'International car insurance',
    description: 'You must add car insurance while traveling abroad.',
    enabled: true,
    filters: ['itineraries-with-car', 'international'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '9',
    type: 'trip',
    title: 'In case of an accident in your rental c...',
    description: '1. Report accident to local law enforcement as required\n2. Initiate a claim with car rental company...',
    enabled: true,
    filters: ['itineraries-with-car', 'international'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '10',
    type: 'company',
    title: 'Direct bill',
    description: 'Direct billing is enabled. Our company covers the cost of all travel expenses. Please contact your account manager with any questions.',
    enabled: true,
    filters: ['all-segments', 'direct-bill'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '11',
    type: 'company',
    title: 'Rate assurance',
    description: 'Your booking was rebooked at a lower rate to save your company money.',
    enabled: false,
    filters: ['all-itineraries', 'rate-assurance'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '12',
    type: 'company',
    title: 'Virtual payments',
    description: 'This trip uses a virtual credit card for payment. Read our useful guide to ensure proper payment acceptance.',
    enabled: true,
    filters: ['itineraries-with-hotel', 'virtual-payments'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [modalNoteType, setModalNoteType] = useState<NoteType>('vendor')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setNotes(JSON.parse(saved))
    } else {
      setNotes(defaultNotes)
    }
  }, [])

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
    }
  }, [notes])

  const handleAddNote = (type: NoteType) => {
    setEditingNote(null)
    setModalNoteType(type)
    setIsModalOpen(true)
  }

  const handleEditNote = (note: Note) => {
    setEditingNote(note)
    setModalNoteType(note.type)
    setIsModalOpen(true)
  }

  const handleSaveNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingNote) {
      setNotes(notes.map(n =>
        n.id === editingNote.id
          ? { ...n, ...noteData, updatedAt: new Date().toISOString() }
          : n
      ))
    } else {
      const newNote: Note = {
        ...noteData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setNotes([...notes, newNote])
    }
    setIsModalOpen(false)
    setEditingNote(null)
  }

  const handleDeleteNote = (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(n => n.id !== id))
    }
  }

  const handleToggleNote = (id: string) => {
    setNotes(notes.map(n =>
      n.id === id ? { ...n, enabled: !n.enabled, updatedAt: new Date().toISOString() } : n
    ))
  }

  const vendorNotes = notes.filter(n => n.type === 'vendor')
  const tripNotes = notes.filter(n => n.type === 'trip')
  const companyNotes = notes.filter(n => n.type === 'company')

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 ml-[200px] flex flex-col">
        <Header />

        <main className="flex-1 p-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">Settings</h1>

          <SettingsTabs activeTab="itinerary-notes" />

          <div className="space-y-6">
            <NotesSection
              title="Vendor notes"
              subtitle="Notes displayed below the vendor information on itineraries"
              notes={vendorNotes}
              onAdd={() => handleAddNote('vendor')}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
              onToggle={handleToggleNote}
            />

            <NotesSection
              title="Trip notes"
              subtitle='Notes displayed in the "Before you go" section on itineraries'
              notes={tripNotes}
              onAdd={() => handleAddNote('trip')}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
              onToggle={handleToggleNote}
            />

            <CompanyNotesSection
              notes={companyNotes}
              onAdd={() => handleAddNote('company')}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
              onToggle={handleToggleNote}
            />
          </div>
        </main>
      </div>

      {isModalOpen && (
        <NoteModal
          note={editingNote}
          noteType={modalNoteType}
          onSave={handleSaveNote}
          onClose={() => {
            setIsModalOpen(false)
            setEditingNote(null)
          }}
        />
      )}
    </div>
  )
}

export default App
