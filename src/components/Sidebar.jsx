import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logoAquaChile.webp';

export default function Sidebar() {
  const { user, logout, hasRole } = useAuth();

  if (!user) return null;

  return (
    <aside style={{
      width: '260px',
      minWidth: '260px',
      height: '100vh',
      position: 'sticky',
      top: 0,
      backgroundColor: 'var(--navy-900)',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '1.5rem 1rem',
      zIndex: 100
    }}>
      {/* ── Parte Superior: Logo + Menú ── */}
      <div>
        {/* Logo AquaChile */}
        <Link 
          to="/" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            textDecoration: 'none', 
            marginBottom: '2rem',
            padding: '0 0.5rem'
          }}
        >
          <img src={logo} alt="AquaChile" style={{ height: '38px', filter: 'brightness(1.05)' }} />
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.15rem', lineHeight: 1.2 }}>
              AquaChile
            </div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              Psicolaboral
            </div>
          </div>
        </Link>

        {/* Etiqueta de Sección */}
        <div style={{
          fontSize: '0.7rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: 'rgba(255,255,255,0.4)',
          marginBottom: '0.75rem',
          paddingLeft: '0.75rem'
        }}>
          Navegación
        </div>

        {/* Menú de Navegación */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <NavLink
            to="/"
            end
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? '#fff' : 'rgba(255,255,255,0.75)',
              backgroundColor: isActive ? 'var(--salmon-500)' : 'transparent',
              transition: 'all 0.2s ease',
            })}
          >
            <i className="bi bi-grid-1x2-fill" style={{ fontSize: '1.1rem' }} />
            <span>Dashboard</span>
          </NavLink>

          {hasRole(['ANALISTA', 'ADMIN']) && (
            <NavLink
              to="/candidatos"
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#fff' : 'rgba(255,255,255,0.75)',
                backgroundColor: isActive ? 'var(--salmon-500)' : 'transparent',
                transition: 'all 0.2s ease',
              })}
            >
              <i className="bi bi-people-fill" style={{ fontSize: '1.1rem' }} />
              <span>Candidatos</span>
            </NavLink>
          )}

          {hasRole(['ANALISTA', 'EVALUADOR', 'ADMIN']) && (
            <NavLink
              to="/solicitudes"
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#fff' : 'rgba(255,255,255,0.75)',
                backgroundColor: isActive ? 'var(--salmon-500)' : 'transparent',
                transition: 'all 0.2s ease',
              })}
            >
              <i className="bi bi-file-earmark-text-fill" style={{ fontSize: '1.1rem' }} />
              <span>Solicitudes</span>
            </NavLink>
          )}
        </nav>
      </div>

      {/* ── Parte Inferior: Perfil de Usuario + Cerrar Sesión ── */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '0.875rem'
      }}>
        {/* Usuario info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'var(--salmon-500)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '0.85rem',
            flexShrink: 0
          }}>
            {user.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{
              fontWeight: 600,
              fontSize: '0.85rem',
              color: '#fff',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {user.nombre}
            </div>
            <span style={{
              display: 'inline-block',
              fontSize: '0.65rem',
              fontWeight: 600,
              padding: '0.15rem 0.45rem',
              borderRadius: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: 'var(--salmon-300)',
              textTransform: 'uppercase'
            }}>
              {user.rol}
            </span>
          </div>
        </div>

        {/* Botón Logout */}
        <button
          onClick={logout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.5rem',
            background: 'transparent',
            border: '1px solid rgba(220, 53, 69, 0.3)',
            borderRadius: '8px',
            color: '#ff8a8a',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(220, 53, 69, 0.15)';
            e.currentTarget.style.color = '#ff6b6b';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#ff8a8a';
          }}
        >
          <i className="bi bi-box-arrow-right" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}

