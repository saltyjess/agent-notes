import { useState } from 'react'
import { X, GitBranch, CheckCircle, Clock, ListChecks } from '@phosphor-icons/react'
import { Version, VersionChange, Note } from '../types'

interface VersionModalProps {
  mode: 'create' | 'view'
  version?: Version
  currentNotes: Note[]
  previousVersion?: Version
  onSave: (version: Omit<Version, 'id'>) => void
  onClose: () => void
}

function VersionModal({ mode, version, currentNotes, previousVersion, onSave, onClose }: VersionModalProps) {
  const [versionNumber, setVersionNumber] = useState(() => {
    if (mode === 'view' && version) return version.version
    // Auto-increment version number
    if (previousVersion) {
      const match = previousVersion.version.match(/v(\d+)\.(\d+)/)
      if (match) {
        const major = parseInt(match[1])
        const minor = parseInt(match[2])
        return `v${major}.${minor + 1}`
      }
    }
    return 'v1.0'
  })
  const [subtitle, setSubtitle] = useState(version?.subtitle || '')
  const [description, setDescription] = useState(version?.description || '')
  const [changes, setChanges] = useState<VersionChange[]>(version?.changes || [])
  const [newChangeText, setNewChangeText] = useState('')

  const handleAddChange = () => {
    if (newChangeText.trim()) {
      setChanges([
        ...changes,
        {
          id: crypto.randomUUID(),
          text: newChangeText.trim(),
          status: 'complete'
        }
      ])
      setNewChangeText('')
    }
  }

  const handleRemoveChange = (id: string) => {
    setChanges(changes.filter(c => c.id !== id))
  }

  const handleSave = () => {
    if (!versionNumber.trim() || !subtitle.trim()) return

    onSave({
      version: versionNumber.trim(),
      subtitle: subtitle.trim(),
      description: description.trim(),
      date: new Date().toISOString(),
      changes,
      snapshot: currentNotes
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '560px',
        maxHeight: '90vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: '#e0f4fc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <GitBranch size={20} style={{ color: '#0076a1' }} weight="bold" />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1f2532', margin: 0 }}>
                {mode === 'create' ? 'Save New Version' : 'Version Details'}
              </h2>
              {mode === 'view' && version && (
                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                  Created {formatDate(version.date)}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#6b7280',
            }}
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
          {/* Version number */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: '#1f2532',
              marginBottom: '8px'
            }}>
              Version
            </label>
            <input
              type="text"
              value={versionNumber}
              onChange={(e) => setVersionNumber(e.target.value)}
              disabled={mode === 'view'}
              placeholder="v1.0"
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '14px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                outline: 'none',
                backgroundColor: mode === 'view' ? '#f8f9fa' : 'white',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Subtitle */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: '#1f2532',
              marginBottom: '8px'
            }}>
              Title
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              disabled={mode === 'view'}
              placeholder="e.g., Added vendor notes, Bug fixes"
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '14px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                outline: 'none',
                backgroundColor: mode === 'view' ? '#f8f9fa' : 'white',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: '#1f2532',
              marginBottom: '8px'
            }}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={mode === 'view'}
              placeholder="Describe what's in this version..."
              rows={3}
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '14px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                outline: 'none',
                resize: 'none',
                fontFamily: 'inherit',
                backgroundColor: mode === 'view' ? '#f8f9fa' : 'white',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Changes */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px'
            }}>
              <ListChecks size={18} style={{ color: '#0076a1' }} weight="bold" />
              <label style={{
                fontSize: '14px',
                fontWeight: 500,
                color: '#1f2532',
              }}>
                Changes in this version
              </label>
            </div>

            {/* Add new change (only in create mode) */}
            {mode === 'create' && (
              <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '12px'
              }}>
                <input
                  type="text"
                  value={newChangeText}
                  onChange={(e) => setNewChangeText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddChange()
                    }
                  }}
                  placeholder="Add a change description..."
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    fontSize: '14px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    outline: 'none',
                  }}
                />
                <button
                  onClick={handleAddChange}
                  disabled={!newChangeText.trim()}
                  style={{
                    padding: '10px 16px',
                    fontSize: '14px',
                    fontWeight: 500,
                    backgroundColor: newChangeText.trim() ? '#0076a1' : '#e5e7eb',
                    color: newChangeText.trim() ? 'white' : '#9ca3af',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: newChangeText.trim() ? 'pointer' : 'not-allowed',
                  }}
                >
                  Add
                </button>
              </div>
            )}

            {/* Changes list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {changes.length === 0 ? (
                <p style={{
                  fontSize: '14px',
                  color: '#9ca3af',
                  fontStyle: 'italic',
                  padding: '12px',
                  textAlign: 'center',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                }}>
                  {mode === 'create' ? 'No changes added yet' : 'No changes recorded'}
                </p>
              ) : (
                changes.map((change) => (
                  <div
                    key={change.id}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      padding: '12px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                    }}
                  >
                    <CheckCircle
                      size={18}
                      style={{ color: '#15803d', flexShrink: 0, marginTop: '2px' }}
                      weight="fill"
                    />
                    <span style={{
                      flex: 1,
                      fontSize: '14px',
                      color: '#374151',
                      lineHeight: 1.5,
                    }}>
                      {change.text}
                    </span>
                    {mode === 'create' && (
                      <button
                        onClick={() => handleRemoveChange(change.id)}
                        style={{
                          padding: '4px',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#9ca3af',
                        }}
                      >
                        <X size={16} weight="bold" />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Snapshot info */}
          {mode === 'view' && version && (
            <div style={{
              marginTop: '20px',
              padding: '12px 16px',
              backgroundColor: '#f0f9ff',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <Clock size={16} style={{ color: '#0076a1' }} />
              <span style={{ fontSize: '13px', color: '#0369a1' }}>
                This version contains a snapshot of {version.snapshot.length} notes
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          gap: '12px',
          padding: '20px 24px',
          borderTop: '1px solid #e5e7eb',
          backgroundColor: '#f8f9fa',
        }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: 500,
              backgroundColor: 'white',
              color: '#374151',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            {mode === 'view' ? 'Close' : 'Cancel'}
          </button>
          {mode === 'create' && (
            <button
              onClick={handleSave}
              disabled={!versionNumber.trim() || !subtitle.trim()}
              style={{
                flex: 1,
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: 500,
                backgroundColor: versionNumber.trim() && subtitle.trim() ? '#0076a1' : '#e5e7eb',
                color: versionNumber.trim() && subtitle.trim() ? 'white' : '#9ca3af',
                border: 'none',
                borderRadius: '8px',
                cursor: versionNumber.trim() && subtitle.trim() ? 'pointer' : 'not-allowed',
              }}
            >
              Save Version
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default VersionModal
