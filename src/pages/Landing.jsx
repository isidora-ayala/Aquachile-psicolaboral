import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormularioCandidato from '../components/Formulario/formulario';
import logo from '../assets/logoAquaChile.webp';
import heroBg from '../assets/hero_bg.jpg';

export default function Landing() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Modal de postulación
  const [showModal, setShowModal] = useState(false);

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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

      {/* ── Fondo hero ── */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0
      }} />
      {/* Overlay oscuro degradado */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(20,35,48,0.82) 0%, rgba(20,35,48,0.55) 50%, rgba(20,35,48,0.72) 100%)',
        zIndex: 1
      }} />

      {/* ── Navbar superior ── */}
      <header style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.25rem 3rem',
        backdropFilter: 'blur(4px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src={logo} alt="AquaChile" style={{ height: '42px', filter: 'brightness(1.1)' }} />
          <span style={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem', letterSpacing: '-0.3px' }}>
            AquaChile
          </span>
        </div>

        {/* Login compacto en navbar */}
        <form onSubmit={handleLogin} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.625rem',
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: '12px',
          padding: '0.625rem 1rem'
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
              fontSize: '0.875rem',
              width: '170px',
            }}
          />
          <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.3)' }} />
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
              fontSize: '0.875rem',
              width: '120px',
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
              padding: '0.5rem 1.1rem',
              fontWeight: 600,
              fontSize: '0.875rem',
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
          marginTop: '-0.5rem',
          padding: '0.5rem',
          color: '#ffb3b3',
          fontSize: '0.875rem',
          fontWeight: 500
        }}>
          ⚠ {loginError}
        </div>
      )}

      {/* ── Hero central ── */}
      <main style={{
        position: 'relative',
        zIndex: 10,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <p style={{
          color: 'var(--salmon-300)',
          fontWeight: 600,
          fontSize: '0.875rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: '1rem'
        }}>
          Patagonia · Chile
        </p>
        <h1 style={{
          color: '#fff',
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: '1.5rem',
          maxWidth: '800px',
          textShadow: '0 2px 20px rgba(0,0,0,0.3)'
        }}>
          Cultivamos el mar,<br />
          <span style={{ color: 'var(--salmon-300)' }}>construimos futuro</span>
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.75)',
          fontSize: '1.125rem',
          maxWidth: '560px',
          lineHeight: 1.7,
          marginBottom: '0'
        }}>
          Somos una de las principales empresas salmoneras de Chile. Si quieres ser parte de nuestro equipo, postula a continuación.
        </p>
      </main>

      {/* ── Sección "Trabaja con nosotros" (pie de página) ── */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        padding: '3rem 2rem',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '20px',
          padding: '2.5rem 3rem',
          maxWidth: '700px',
          width: '100%',
          textAlign: 'center'
        }}>
          {/* Icono decorativo */}
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'var(--salmon-500)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            fontSize: '1.5rem'
          }}>
            <i className="bi bi-person-plus-fill" style={{ color: '#fff' }} />
          </div>

          <h2 style={{
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.75rem',
            marginBottom: '0.5rem'
          }}>
            Trabaja con nosotros
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.65)',
            marginBottom: '1.75rem',
            fontSize: '1rem',
            lineHeight: 1.6
          }}>
            Únete a nuestro equipo. Completa el formulario y un representante de selección se pondrá en contacto contigo.
          </p>

          {/* Chips de beneficios */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', justifyContent: 'center', marginBottom: '2rem' }}>
            {['🌊 Entorno natural único', '📈 Crecimiento profesional', '🤝 Equipo colaborativo', '🏥 Beneficios de salud'].map(b => (
              <span key={b} style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.18)',
                color: 'rgba(255,255,255,0.85)',
                borderRadius: '20px',
                padding: '0.375rem 1rem',
                fontSize: '0.8125rem',
                fontWeight: 500
              }}>
                {b}
              </span>
            ))}
          </div>

          <button
            onClick={() => setShowModal(true)}
            style={{
              background: 'var(--salmon-500)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              padding: '0.875rem 2.5rem',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 20px rgba(255,107,53,0.4)',
              letterSpacing: '0.3px'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--salmon-600)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--salmon-500)'}
          >
            Postular ahora →
          </button>
        </div>
      </section>

      {/* ── Footer mínimo ── */}
      <footer style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        padding: '1.25rem',
        color: 'rgba(255,255,255,0.35)',
        fontSize: '0.8125rem',
        borderTop: '1px solid rgba(255,255,255,0.06)'
      }}>
        © {new Date().getFullYear()} AquaChile S.A. — Sistema de Evaluación Psicolaboral
      </footer>

      {/* ── Modal de postulación ── */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10,20,30,0.7)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1rem',
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '540px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
            animation: 'slideUp 0.25s ease'
          }}>
            {/* Header del modal */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.5rem 1.75rem',
              borderBottom: '1px solid var(--gray-200)',
              background: 'var(--gray-50)',
              borderRadius: '20px 20px 0 0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img src={logo} alt="AquaChile" style={{ height: '32px' }} />
                <div>
                  <h5 style={{ margin: 0, fontWeight: 700, color: 'var(--navy-900)' }}>Formulario de Postulación</h5>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--gray-600)' }}>AquaChile S.A.</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: 'var(--gray-200)',
                  border: 'none',
                  borderRadius: '8px',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gray-700)',
                  fontWeight: 700
                }}
              >
                ✕
              </button>
            </div>

            {/* Cuerpo del modal */}
            <div style={{ padding: '1.75rem' }}>
              <FormularioCandidato onSuccess={() => {}} />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        input::placeholder { color: rgba(255,255,255,0.45); }
      `}</style>
    </div>
  );
}
