import FormularioCandidato from '../components/Formulario/formulario';
import logo from '../assets/logoAquaChile.webp';
import fondoBg from '../assets/fondo.jpg';

export default function FormularioPage() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      padding: '1rem'
    }}>

      {/* ── Fondo con imagen del mar ── */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `url(${fondoBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0
      }} />
      {/* Overlay sutil */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(15,30,60,0.5) 0%, rgba(15,30,60,0.15) 50%, rgba(15,30,60,0.4) 100%)',
        zIndex: 1
      }} />

      {/* ── Card centrada con el formulario ── */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.15)',
        width: '100%',
        maxWidth: '500px',
        padding: '2rem 2.5rem',
        animation: 'cardIn 0.4s ease'
      }}>
        {/* Logo centrado */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '0.25rem'
        }}>
          <img src={logo} alt="AquaChile" style={{ height: '80px', marginBottom: '0.5rem' }} />
          <h2 style={{
            margin: 0,
            fontWeight: 700,
            fontSize: '1.15rem',
            color: 'var(--navy-900)'
          }}>
            Postulación
          </h2>
          <p style={{
            margin: 0,
            fontSize: '0.75rem',
            color: 'var(--gray-600)'
          }}>
          </p>
        </div>

        {/* Separador */}
        <div style={{
          height: '1px',
          background: 'var(--gray-200)',
          margin: '0.625rem 0'
        }} />

        {/* Formulario compacto */}
        <div className="formulario-compact">
          <FormularioCandidato onSuccess={() => { }} />
        </div>
      </div>

      <style>{`
        @keyframes cardIn {
          from { transform: scale(0.95) translateY(15px); opacity: 0; }
          to   { transform: scale(1) translateY(0); opacity: 1; }
        }
        .formulario-compact form {
          gap: 0.5rem !important;
        }
        .formulario-compact .form-label {
          font-size: 0.8rem;
          margin-bottom: 0.125rem;
        }
        .formulario-compact .form-control,
        .formulario-compact .form-select {
          padding: 0.4rem 0.7rem;
          font-size: 0.85rem;
        }
        .formulario-compact button[type="submit"] {
          padding: 0.6rem !important;
          font-size: 0.9rem;
          margin-top: 0.25rem !important;
        }
      `}</style>
    </div>
  );
}
