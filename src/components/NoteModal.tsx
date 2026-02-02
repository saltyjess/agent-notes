import { useState, useEffect } from 'react'
import { X, TextAa, TextB, TextItalic, ListBullets, Link } from '@phosphor-icons/react'
import { Note, NoteType, DISPLAY_ON_OPTIONS, TRIP_TYPE_OPTIONS, VENDOR_OPTIONS } from '../types'

interface NoteModalProps {
  note: Note | null
  noteType: NoteType
  onSave: (data: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void
  onClose: () => void
}

function NoteModal({ note, noteType, onSave, onClose }: NoteModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [vendor, setVendor] = useState('')
  const [displayOn, setDisplayOn] = useState('every-itinerary')
  const [tripType, setTripType] = useState('all')
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setDescription(note.description)
      setVendor(note.vendor || '')
      setEnabled(note.enabled)
      // Extract displayOn and tripType from filters if present
      if (note.filters.includes('international')) setTripType('international')
      else if (note.filters.includes('domestic')) setTripType('domestic')
      else setTripType('all')
    } else {
      setTitle('')
      setDescription('')
      setVendor('')
      setDisplayOn('every-itinerary')
      setTripType('all')
      setEnabled(true)
    }
  }, [note])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const filters: string[] = []
    if (tripType !== 'all') filters.push(tripType)
    if (displayOn !== 'every-itinerary') filters.push(displayOn)

    onSave({
      type: noteType,
      title: noteType === 'vendor' ? (vendor || 'Vendor Note') : title,
      description,
      vendor: noteType === 'vendor' ? vendor : undefined,
      filters,
      enabled,
    })
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const isVendorNote = noteType === 'vendor'
  const modalTitle = isVendorNote ? 'Add vendor note' : 'Add note'

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        zIndex: 50,
      }}
      onClick={handleBackdropClick}
    >
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '460px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 600,
            color: '#1f2532',
            margin: 0,
          }}>
            {modalTitle}
          </h2>
          <button
            onClick={onClose}
            style={{
              padding: '4px',
              borderRadius: '4px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: '#9ca3af',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '0 24px 24px' }}>
          {isVendorNote ? (
            /* Vendor Note Form */
            <>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#5c6370',
                  marginBottom: '8px',
                }}>
                  Select vendor
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      paddingRight: '36px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: vendor ? '#1f2532' : '#9ca3af',
                      backgroundColor: 'white',
                      appearance: 'none',
                      cursor: 'pointer',
                      outline: 'none',
                    }}
                  >
                    <option value="" disabled>Select</option>
                    {VENDOR_OPTIONS.map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                  <div style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: '#9ca3af',
                  }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#5c6370',
                  marginBottom: '8px',
                }}>
                  Note
                </label>
                <div style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Content"
                    rows={5}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: 'none',
                      fontSize: '14px',
                      resize: 'none',
                      outline: 'none',
                      fontFamily: 'inherit',
                    }}
                  />
                  {/* Rich Text Toolbar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '8px 12px',
                    borderTop: '1px solid #e5e7eb',
                    backgroundColor: '#fafafa',
                  }}>
                    <ToolbarButton icon={<TextAa size={18} />} />
                    <ToolbarButton icon={<TextB size={18} weight="bold" />} />
                    <ToolbarButton icon={<TextItalic size={18} />} />
                    <ToolbarButton icon={<ListBullets size={18} />} />
                    <ToolbarButton icon={<Link size={18} />} />
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Trip/Company Note Form */
            <>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#5c6370',
                  marginBottom: '8px',
                }}>
                  Display on
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={displayOn}
                    onChange={(e) => setDisplayOn(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      paddingRight: '36px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: '#1f2532',
                      backgroundColor: 'white',
                      appearance: 'none',
                      cursor: 'pointer',
                      outline: 'none',
                    }}
                  >
                    {DISPLAY_ON_OPTIONS.map(option => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                  </select>
                  <div style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: '#9ca3af',
                  }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Trip Type Radio Buttons */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                marginBottom: '20px',
              }}>
                {TRIP_TYPE_OPTIONS.map(option => (
                  <label
                    key={option.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#1f2532',
                    }}
                  >
                    <input
                      type="radio"
                      name="tripType"
                      value={option.id}
                      checked={tripType === option.id}
                      onChange={(e) => setTripType(e.target.value)}
                      style={{
                        width: '18px',
                        height: '18px',
                        accentColor: '#1f2532',
                        cursor: 'pointer',
                      }}
                    />
                    {option.label}
                  </label>
                ))}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#5c6370',
                  marginBottom: '8px',
                }}>
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="For international travelers"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#5c6370',
                  marginBottom: '8px',
                }}>
                  Note
                </label>
                <div style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Content"
                    rows={5}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: 'none',
                      fontSize: '14px',
                      resize: 'none',
                      outline: 'none',
                      fontFamily: 'inherit',
                    }}
                  />
                  {/* Rich Text Toolbar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '8px 12px',
                    borderTop: '1px solid #e5e7eb',
                    backgroundColor: '#fafafa',
                  }}>
                    <ToolbarButton icon={<TextAa size={18} />} />
                    <ToolbarButton icon={<TextB size={18} weight="bold" />} />
                    <ToolbarButton icon={<TextItalic size={18} />} />
                    <ToolbarButton icon={<ListBullets size={18} />} />
                    <ToolbarButton icon={<Link size={18} />} />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Actions */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            marginTop: '24px',
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                backgroundColor: 'white',
                fontSize: '14px',
                fontWeight: 500,
                color: '#1f2532',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#9ca3af',
                fontSize: '14px',
                fontWeight: 500,
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ToolbarButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button
      type="button"
      style={{
        padding: '6px',
        borderRadius: '4px',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        color: '#6b7280',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon}
    </button>
  )
}

export default NoteModal
