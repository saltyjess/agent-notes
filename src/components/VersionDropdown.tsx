import { useState, useRef, useEffect } from 'react'
import { GitBranch, CaretDown, CaretUp, Clock, CheckCircle } from '@phosphor-icons/react'
import { Version } from '../types'

interface VersionDropdownProps {
  versions: Version[]
  currentVersion: Version
  onSelect: (version: Version) => void
  onCreateVersion: () => void
}

function VersionDropdown({ versions, currentVersion, onSelect, onCreateVersion }: VersionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#f3f4f6',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '8px 12px',
          color: '#1f2532',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 500,
          minWidth: '140px',
        }}
      >
        <GitBranch size={16} style={{ color: '#0076a1' }} weight="bold" />
        <span>{currentVersion.version}</span>
        {isOpen ? (
          <CaretUp size={14} style={{ marginLeft: 'auto', color: '#6b7280' }} weight="bold" />
        ) : (
          <CaretDown size={14} style={{ marginLeft: 'auto', color: '#6b7280' }} weight="bold" />
        )}
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '4px',
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          overflow: 'hidden',
          zIndex: 50,
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          minWidth: '280px',
        }}>
          {/* Create new version button */}
          <button
            onClick={() => {
              onCreateVersion()
              setIsOpen(false)
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 16px',
              backgroundColor: '#f0fdf4',
              border: 'none',
              borderBottom: '1px solid #e5e7eb',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              color: '#15803d',
            }}
          >
            <CheckCircle size={16} weight="bold" />
            Save as new version
          </button>

          {/* Version list */}
          <div style={{ maxHeight: '300px', overflow: 'auto' }}>
            {versions.map((v, i) => (
              <div
                key={v.id}
                onClick={() => {
                  onSelect(v)
                  setIsOpen(false)
                }}
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  borderBottom: i < versions.length - 1 ? '1px solid #f3f4f6' : 'none',
                  backgroundColor: v.id === currentVersion.id ? '#f0f9ff' : 'transparent',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (v.id !== currentVersion.id) {
                    e.currentTarget.style.backgroundColor = '#f8f9fa'
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = v.id === currentVersion.id ? '#f0f9ff' : 'transparent'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '4px'
                }}>
                  <span style={{
                    fontWeight: 600,
                    fontSize: '14px',
                    color: v.id === currentVersion.id ? '#0076a1' : '#1f2532'
                  }}>
                    {v.version}
                  </span>
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    color: '#9ca3af'
                  }}>
                    <Clock size={12} />
                    {formatDate(v.date)}
                  </span>
                </div>
                <p style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  margin: 0
                }}>
                  {v.subtitle}
                </p>
                {v.changes.length > 0 && (
                  <p style={{
                    fontSize: '11px',
                    color: '#9ca3af',
                    marginTop: '4px'
                  }}>
                    {v.changes.length} change{v.changes.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default VersionDropdown
