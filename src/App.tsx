import { useState, useEffect } from 'react'
import { Note, NoteType, Version, Project } from './types'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import SettingsTabs from './components/SettingsTabs'
import NotesSection from './components/NotesSection'
import CompanyNotesSection from './components/CompanyNotesSection'
import NoteModal from './components/NoteModal'
import VersionBar from './components/VersionBar'
import VersionModal from './components/VersionModal'
import ProjectGallery from './components/ProjectGallery'

const VERSION_BAR_HEIGHT = 56
const HEADER_HEIGHT = 56

const PROJECTS_STORAGE_KEY = 'andavo-design-projects'

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
    vendor: 'Alaskan Airlines',
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

// Default project with initial version
const defaultProject: Project = {
  id: 'itinerary-notes',
  name: 'Itinerary Notes',
  description: 'Settings page for managing vendor, trip, and company notes that appear on travel itineraries.',
  heroImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop',
  versions: [
    {
      id: 'v1.0',
      version: 'v1.0',
      subtitle: 'Initial setup',
      description: 'Initial version with default vendor, trip, and company notes.',
      date: new Date().toISOString(),
      changes: [
        { id: '1', text: 'Added default vendor notes (Hertz, Air China, Delta, Alaska Airlines)', status: 'complete' },
        { id: '2', text: 'Added default trip notes for travelers', status: 'complete' },
        { id: '3', text: 'Added company notes with toggle controls', status: 'complete' },
      ],
      snapshot: defaultNotes
    }
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

function App() {
  // Project and view state
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentVersion, setCurrentVersion] = useState<Version | null>(null)

  // Notes state (for current project)
  const [notes, setNotes] = useState<Note[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [modalNoteType, setModalNoteType] = useState<NoteType>('vendor')

  // Version modal state
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false)
  const [versionModalMode, setVersionModalMode] = useState<'create' | 'view'>('create')
  const [viewingVersion, setViewingVersion] = useState<Version | null>(null)

  // Load projects from localStorage
  useEffect(() => {
    const savedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY)

    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects) as Project[]
      setProjects(parsedProjects)
    } else {
      // Initialize with default project
      setProjects([defaultProject])
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify([defaultProject]))
    }
  }, [])

  // Save projects to localStorage
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects))
    }
  }, [projects])

  // When a project is selected, load its latest version's notes
  useEffect(() => {
    if (selectedProject && selectedProject.versions.length > 0) {
      const latestVersion = selectedProject.versions[0]
      setCurrentVersion(latestVersion)
      setNotes(latestVersion.snapshot)
    }
  }, [selectedProject])

  // Project handlers
  const handleSelectProject = (project: Project) => {
    setSelectedProject(project)
  }

  const handleBackToGallery = () => {
    // Save current notes to the project before going back
    if (selectedProject && currentVersion) {
      const updatedVersions = selectedProject.versions.map(v =>
        v.id === currentVersion.id ? { ...v, snapshot: notes } : v
      )
      const updatedProject = { ...selectedProject, versions: updatedVersions, updatedAt: new Date().toISOString() }
      setProjects(projects.map(p => p.id === selectedProject.id ? updatedProject : p))
    }
    setSelectedProject(null)
    setCurrentVersion(null)
  }

  const handleCreateProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: 'New Project',
      description: 'A new Andavo project',
      heroImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop',
      versions: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setProjects([...projects, newProject])
    setSelectedProject(newProject)
  }

  // Note handlers
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

  // Version handlers
  const handleCreateVersion = () => {
    setVersionModalMode('create')
    setViewingVersion(null)
    setIsVersionModalOpen(true)
  }

  const handleSelectVersion = (version: Version) => {
    setVersionModalMode('view')
    setViewingVersion(version)
    setIsVersionModalOpen(true)
  }

  const handleSaveVersion = (versionData: Omit<Version, 'id'>) => {
    if (!selectedProject) return

    const newVersion: Version = {
      ...versionData,
      id: versionData.version,
      snapshot: [...notes]
    }

    const updatedVersions = [newVersion, ...selectedProject.versions]
    const updatedProject = {
      ...selectedProject,
      versions: updatedVersions,
      updatedAt: new Date().toISOString()
    }

    setProjects(projects.map(p => p.id === selectedProject.id ? updatedProject : p))
    setSelectedProject(updatedProject)
    setCurrentVersion(newVersion)
    setIsVersionModalOpen(false)
  }

  // Filter notes by type
  const vendorNotes = notes.filter(n => n.type === 'vendor')
  const tripNotes = notes.filter(n => n.type === 'trip')
  const companyNotes = notes.filter(n => n.type === 'company')

  // Show gallery if no project is selected
  if (!selectedProject) {
    return (
      <ProjectGallery
        projects={projects}
        onSelectProject={handleSelectProject}
        onCreateProject={handleCreateProject}
      />
    )
  }

  // Show project view
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#121418' }}>
      {/* Version Bar - Top level overlay */}
      {currentVersion && (
        <VersionBar
          projectName={selectedProject.name}
          versions={selectedProject.versions}
          currentVersion={currentVersion}
          onSelectVersion={handleSelectVersion}
          onCreateVersion={handleCreateVersion}
          onBack={handleBackToGallery}
        />
      )}

      {/* App Frame - Contains the actual app below the version bar */}
      <div style={{
        marginTop: `${VERSION_BAR_HEIGHT}px`,
        height: `calc(100vh - ${VERSION_BAR_HEIGHT}px)`,
        overflow: 'hidden',
        borderRadius: '0',
        backgroundColor: '#f8f9fa',
      }}>
        {/* Inner app layout */}
        <div style={{ display: 'flex', height: '100%' }}>
          <Header />
          <Sidebar />

          <div style={{ flex: 1, marginLeft: '200px', marginTop: `${HEADER_HEIGHT}px`, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
            <main style={{ flex: 1, padding: '24px', backgroundColor: '#f8f9fa' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#1f2532', marginBottom: '20px' }}>Settings</h1>

              <SettingsTabs activeTab="itinerary-notes" />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
        </div>
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

      {isVersionModalOpen && currentVersion && (
        <VersionModal
          mode={versionModalMode}
          version={viewingVersion || undefined}
          currentNotes={notes}
          previousVersion={selectedProject.versions[0]}
          onSave={handleSaveVersion}
          onClose={() => {
            setIsVersionModalOpen(false)
            setViewingVersion(null)
          }}
        />
      )}
    </div>
  )
}

export default App
