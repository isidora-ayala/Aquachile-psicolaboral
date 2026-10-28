import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Candidatos from './pages/Candidatos';
import Solicitudes from './pages/Solicitudes';
import Evaluacion from './pages/Evaluacion';
import FormularioPage from './pages/FormularioPage';
import logo from './assets/logoAquaChile.webp';

function Navbar() {
  const { user, logout, hasRole } = useAuth();

  if (!user) return null;

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <img src={logo} alt="AquaChile" style={{ height: '40px' }} />
          <span>AquaChile</span>
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-1">
            <li className="nav-item">
              <Link to="/" className="nav-link">Dashboard</Link>
            </li>
            {hasRole(['ANALISTA', 'ADMIN']) && (
              <li className="nav-item">
                <Link to="/candidatos" className="nav-link">Candidatos</Link>
              </li>
            )}
            {hasRole(['ANALISTA', 'EVALUADOR', 'ADMIN']) && (
              <li className="nav-item">
                <Link to="/solicitudes" className="nav-link">Solicitudes</Link>
              </li>
            )}
          </ul>

          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle d-flex align-items-center gap-2"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="d-flex align-items-center justify-content-center fw-600"
                style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--salmon-100)', color: 'var(--salmon-700)' }}
              >
                {user.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <span className="d-none d-sm-inline">{user.nombre}</span>
              <span className="badge bg-light text-dark text-uppercase" style={{ fontSize: '0.625rem' }}>{user.rol}</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <span className="dropdown-item-text text-muted small">
                  {user.email}
                </span>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={logout}
                >
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

function FullscreenRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/formulario"
        element={isAuthenticated ? <Navigate to="/" replace /> : <FormularioPage />}
      />
    </Routes>
  );
}

function LayoutRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={['ANALISTA', 'EVALUADOR', 'ADMIN']}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/candidatos"
        element={
          <ProtectedRoute allowedRoles={['ANALISTA', 'ADMIN']}>
            <Candidatos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/solicitudes"
        element={
          <ProtectedRoute allowedRoles={['ANALISTA', 'EVALUADOR', 'ADMIN']}>
            <Solicitudes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/evaluacion/:id"
        element={
          <ProtectedRoute allowedRoles={['EVALUADOR', 'ADMIN']}>
            <Evaluacion />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Rutas fullscreen (sin navbar ni container)
  const fullscreenPaths = ['/login', '/formulario'];
  const isFullscreen = fullscreenPaths.includes(location.pathname);

  if (isFullscreen) {
    return <FullscreenRoutes />;
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      <main className="flex-grow-1 container py-4">
        <LayoutRoutes />
      </main>
    </div>
  );
}

function AppLayout() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default AppLayout;