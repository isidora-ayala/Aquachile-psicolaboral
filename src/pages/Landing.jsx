import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormularioCandidato from '../components/Formulario/formulario';
import logo from '../assets/logoAquaChile.webp';
import fondoBg from '../assets/fondo.jpg';

export default function Landing() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    const success = login(email, password);
    if (success) {
      navigate('/');
    } else {
      setLoginError('Email o contraseña incorrectos');
    }
    setLoginLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* ── Fondo con imagen ── */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `url(${fondoBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0
      }} />
      {/* Overlay sutil para legibilidad */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(15,30,60,0.45) 0%, rgba(15,30,60,0.2) 50%, rgba(15,30,60,0.35) 100%)',
        zIndex: 1
      }} />

      {/* ── Navbar superior con login ── */}
      <header style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2.5rem',
        backdropFilter: 'blur(4px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src={logo} alt="AquaChile" style={{ height: '38px', filter: 'brightness(1.1)' }} />
          <span style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.3px' }}>
            AquaChile
          </span>
        </div>

        <form onSubmit={handleLogin} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '10px',
          padding: '0.5rem 0.875rem'
        }}>
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setLoginError(''); }}
            placeholder="Correo"
            required
            autoComplete="email"
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: '0.85rem',
              width: '160px',
            }}
          />
          <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.3)' }} />
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setLoginError(''); }}
            placeholder="Contraseña"
            required
            autoComplete="current-password"
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: '0.85rem',
              width: '110px',
            }}
          />
          <button
            type="submit"
            disabled={loginLoading}
            style={{
              background: 'var(--salmon-500)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '0.45rem 1rem',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'background 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {loginLoading ? '...' : 'Ingresar →'}
          </button>
        </form>
      </header>

      {/* Error de login */}
      {loginError && (
        <div style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0.5rem',
          color: '#ffb3b3',
          fontSize: '0.875rem',
          fontWeight: 500
        }}>
          ⚠ {loginError}
        </div>
      )}

      {/* ── Contenido central: card con formulario ── */}
      <main style={{
        position: 'relative',
        zIndex: 10,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.2)',
          width: '100%',
          maxWidth: '520px',
          padding: '2.5rem',
          animation: 'cardIn 0.4s ease'
        }}>
          {/* Encabezado del formulario */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.875rem',
            marginBottom: '0.5rem'
          }}>
            <img src={logo} alt="AquaChile" style={{ height: '36px' }} />
            <div>
              <h2 style={{
                margin: 0,
                fontWeight: 700,
                fontSize: '1.35rem',
                color: 'var(--navy-900)'
              }}>
                Postulación
              </h2>
              <p style={{
                margin: 0,
                fontSize: '0.8125rem',
                color: 'var(--gray-600)'
              }}>
                AquaChile S.A.
              </p>
            </div>
          </div>

          {/* Separador */}
          <div style={{
            height: '1px',
            background: 'var(--gray-200)',
            margin: '1rem 0 1.5rem'
          }} />

          {/* Beneficios como chips */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            {['🌊 Entorno natural', '📈 Crecimiento', '🤝 Equipo', '🏥 Beneficios'].map(b => (
              <span key={b} style={{
                background: 'var(--salmon-50)',
                color: 'var(--salmon-800)',
                borderRadius: '16px',
                padding: '0.25rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 500,
                border: '1px solid var(--salmon-100)'
              }}>
                {b}
              </span>
            ))}
          </div>

          {/* Formulario */}
          <FormularioCandidato onSuccess={() => {}} />
        </div>
      </main>

      {/* ── Footer mínimo ── */}
      <footer style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        padding: '1rem',
        color: 'rgba(255,255,255,0.4)',
        fontSize: '0.8rem',
        borderTop: '1px solid rgba(255,255,255,0.06)'
      }}>
        © {new Date().getFullYear()} AquaChile S.A. — Sistema de Evaluación Psicolaboral
      </footer>

      <style>{`
        @keyframes cardIn {
          from { transform: scale(0.95) translateY(15px); opacity: 0; }
          to   { transform: scale(1) translateY(0); opacity: 1; }
        }
        input::placeholder { color: rgba(255,255,255,0.45); }
      `}</style>
    </div>
  );
}
