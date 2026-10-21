import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logoAquaChile.webp';

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Email o contraseña incorrectos');
    }
    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', padding: '2rem' }}>
      <div className="card p-4" style={{ width: '100%', maxWidth: '420px', boxShadow: 'var(--shadow-lg)' }}>
        <div className="text-center mb-4">
          <img src={logo} alt="Logo AquaChile" style={{ maxWidth: '180px', marginBottom: '1rem' }} />
          <h2 className="fw-700" style={{ color: 'var(--navy-900)' }}>Iniciar Sesión</h2>
          <p className="text-muted mt-2">Evaluación Psicolaboral - AquaChile</p>
        </div>

        {error && (
          <div className="alert alert-danger mb-3" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="analista@aquachile.cl"
              disabled={loading}
            />
            <div className="invalid-feedback">Ingrese un correo válido</div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="1234"
              disabled={loading}
            />
            <div className="invalid-feedback">Ingrese su contraseña</div>
          </div>

          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ padding: '0.875rem' }}
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </div>
        </form>

        <div className="mt-4 p-3 text-center" style={{ background: 'var(--gray-50)', borderRadius: 'var(--radius)' }}>
          <small className="text-muted d-block">Credenciales de prueba:</small>
          <small className="text-muted d-block">analista@aquachile.cl / 1234</small>
          <small className="text-muted d-block">evaluador@aquachile.cl / 1234</small>
          <small className="text-muted d-block">admin@aquachile.cl / 1234</small>
        </div>
      </div>
    </div>
  );
}
