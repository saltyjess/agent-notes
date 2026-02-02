import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, GitBranch, CaretDown, CaretUp, Clock, CheckCircle, ListChecks } from '@phosphor-icons/react'
import { Version } from '../types'

interface VersionBarProps {
  projectName: string
  versions: Version[]
  currentVersion: Version
  onSelectVersion: (version: Version) => void
  onCreateVersion: () => void
  onBack?: () => void
}

function VersionBar({
  projectName,
  versions,
  currentVersion,
  onSelectVersion,
  onCreateVersion,
  onBack
}: VersionBarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
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
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '56px',
      backgroundColor: '#1a1d24',
      borderBottom: '1px solid #2a2f38',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      zIndex: 200,
    }}>
      {/* Left side - Back button and project name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              backgroundColor: '#2a2f38',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3a3f48'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2a2f38'}
          >
            <ArrowLeft size={18} weight="bold" />
          </button>
        )}
        <div>
          <h1 style={{ fontSize: '16px', fontWeight: 600, color: 'white', margin: 0 }}>
            {projectName}
          </h1>
          <p style={{ fontSize: '12px', color: '#8b919a', margin: 0 }}>
            Project Overview
          </p>
        </div>
      </div>

      {/* Right side - Version dropdown */}
      <div ref={dropdownRef} style={{ position: 'relative' }}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#2a2f38',
            border: '1px solid #3a3f48',
            borderRadius: '8px',
            padding: '8px 14px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
            minWidth: '140px',
            transition: 'background 0.15s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3a3f48'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2a2f38'}
        >
          <GitBranch size={16} style={{ color: '#00b4d8' }} weight="bold" />
          <span>{currentVersion.version}</span>
          {isDropdownOpen ? (
            <CaretUp size={14} style={{ marginLeft: 'auto', color: '#8b919a' }} weight="bold" />
          ) : (
            <CaretDown size={14} style={{ marginLeft: 'auto', color: '#8b919a' }} weight="bold" />
          )}
        </button>

        {isDropdownOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '4px',
            backgroundColor: '#242830',
            border: '1px solid #2a2f38',
            borderRadius: '12px',
            overflow: 'hidden',
            zIndex: 50,
            boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
            minWidth: '320px',
          }}>
            {/* Create new version button */}
            <button
              onClick={() => {
                onCreateVersion()
                setIsDropdownOpen(false)
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 16px',
                backgroundColor: 'rgba(74, 222, 128, 0.1)',
                border: 'none',
                borderBottom: '1px solid #2a2f38',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                color: '#4ade80',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(74, 222, 128, 0.15)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(74, 222, 128, 0.1)'}
            >
              <CheckCircle size={18} weight="bold" />
              Save as new version
            </button>

            {/* Version list */}
            <div style={{ maxHeight: '400px', overflow: 'auto' }}>
              {versions.map((v, i) => (
                <div
                  key={v.id}
                  onClick={() => {
                    onSelectVersion(v)
                    setIsDropdownOpen(false)
                  }}
                  style={{
                    padding: '14px 16px',
                    cursor: 'pointer',
                    borderBottom: i < versions.length - 1 ? '1px solid #2a2f38' : 'none',
                    backgroundColor: v.id === currentVersion.id ? 'rgba(0, 180, 216, 0.1)' : 'transparent',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (v.id !== currentVersion.id) {
                      e.currentTarget.style.backgroundColor = '#2a2f38'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = v.id === currentVersion.id ? 'rgba(0, 180, 216, 0.1)' : 'transparent'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '6px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        backgroundColor: v.id === currentVersion.id ? '#00b4d8' : '#3a3f48',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 600,
                      }}>
                        {v.version}
                      </span>
                    </div>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '11px',
                      color: '#5c6370'
                    }}>
                      <Clock size={12} />
                      {formatDate(v.date)}
                    </span>
                  </div>
                  <h3 style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'white',
                    margin: '0 0 4px 0'
                  }}>
                    {v.subtitle}
                  </h3>
                  <p style={{
                    fontSize: '12px',
                    color: '#8b919a',
                    margin: '0 0 8px 0',
                    lineHeight: 1.4,
                  }}>
                    {v.description}
                  </p>
                  {v.changes.length > 0 && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '11px',
                      color: '#5c6370'
                    }}>
                      <ListChecks size={14} />
                      {v.changes.length} change{v.changes.length !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VersionBar
