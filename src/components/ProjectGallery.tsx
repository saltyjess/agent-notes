import { Stack, ArrowRight, Clock } from '@phosphor-icons/react'
import { Project } from '../types'

interface ProjectGalleryProps {
  projects: Project[]
  onSelectProject: (project: Project) => void
  onCreateProject: () => void
}

function ProjectGallery({ projects, onSelectProject, onCreateProject }: ProjectGalleryProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#121418',
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 32px',
        borderBottom: '1px solid #2a2f38',
        position: 'sticky',
        top: 0,
        backgroundColor: '#121418',
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #00b4d8, #0077b6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="24" height="26" viewBox="0 0 32 34" fill="none">
              <path d="M31.0132 17.6122C31.0132 17.6122 29.6145 13.6206 25.942 10.819C26.5345 12.2742 26.9273 13.8586 27.0995 15.545C27.5956 16.191 28.3811 17.619 28.3811 17.619C27.637 19.183 26.5828 20.5158 25.3356 21.6038C27.1753 13.3146 23.3581 5.11376 15.5032 2.33936C15.5032 2.33936 11.4586 3.71976 8.61976 7.34417C10.0943 6.75937 11.6997 6.37177 13.4016 6.20176C14.0562 5.71216 15.5032 4.93016 15.5032 4.93016C17.0948 5.66456 18.4384 6.70497 19.5409 7.94257C11.1416 6.10656 2.81813 9.87377 0 17.6394C0 17.6394 1.39873 21.631 5.07126 24.4326C4.47869 22.9774 4.08595 21.393 3.91369 19.7066C3.41759 19.0606 2.6252 17.6326 2.6252 17.6326C3.37625 16.055 4.43046 14.7222 5.69139 13.6342C3.83101 21.937 7.64134 30.1582 15.517 32.9394C15.517 32.9394 19.5616 31.559 22.4004 27.9346C20.9258 28.5194 19.3204 28.907 17.6185 29.077C16.9639 29.5666 15.517 30.3486 15.517 30.3486C13.9115 29.6074 12.5541 28.5534 11.4517 27.3022C19.8647 29.145 28.1951 25.3778 31.0201 17.6122H31.0132ZM9.233 23.8614C7.48286 19.9854 7.42085 15.3138 9.18477 11.4514C13.1122 9.72417 17.8597 9.64937 21.7733 11.3902C23.5235 15.2594 23.6062 19.931 21.856 23.7934C17.9217 25.5342 13.1605 25.609 9.23989 23.8682L9.233 23.8614Z" fill="white"/>
            </svg>
          </div>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: 600, color: 'white', margin: 0 }}>Andavo Design Shop</h1>
            <p style={{ fontSize: '12px', color: '#8b919a', margin: 0 }}>Project Gallery</p>
          </div>
        </div>

        <button
          onClick={onCreateProject}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#00b4d8',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 16px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background 0.15s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0096c7'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00b4d8'}
        >
          New Project
        </button>
      </header>

      {/* Project Grid */}
      <div style={{
        padding: '48px 32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '32px',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        {projects.map((project, index) => {
          const latestVersion = project.versions[0]
          return (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              style={{
                width: '100%',
                height: '360px',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#1a1d24',
                cursor: 'pointer',
                position: 'relative',
                transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease',
                animation: `cardEntrance 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s backwards`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Hero Image with gradient */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${project.heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(18, 20, 24, 0.98) 0%, rgba(18, 20, 24, 0.8) 40%, rgba(18, 20, 24, 0.4) 100%)',
                }} />
              </div>

              {/* Version badge */}
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <Stack size={14} weight="bold" />
                {project.versions.length} version{project.versions.length !== 1 ? 's' : ''}
              </div>

              {/* Content */}
              <div style={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '24px',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  color: '#8b919a',
                  marginBottom: '4px',
                }}>
                  <Clock size={12} />
                  Latest: {latestVersion ? formatDate(latestVersion.date) : 'No versions'}
                </div>
                <h3 style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: 'white',
                  marginBottom: '8px',
                }}>
                  {project.name}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#8b919a',
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  marginBottom: '20px',
                }}>
                  {project.description}
                </p>

                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: 'white',
                    color: '#121418',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    width: '100%',
                    transition: 'transform 0.15s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Open Project
                  <ArrowRight size={18} weight="bold" />
                </button>
              </div>
            </div>
          )
        })}

        {/* Empty state */}
        {projects.length === 0 && (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '80px 32px',
            color: '#5c6370',
          }}>
            <Stack size={64} style={{ marginBottom: '24px' }} />
            <p style={{ fontSize: '18px', marginBottom: '8px', color: '#8b919a' }}>No projects yet</p>
            <p style={{ fontSize: '14px' }}>Click "New Project" to create your first project</p>
          </div>
        )}
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes cardEntrance {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}

export default ProjectGallery
