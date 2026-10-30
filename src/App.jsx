import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Candidatos from './pages/Candidatos';
import Solicitudes from './pages/Solicitudes';
import Evaluacion from './pages/Evaluacion';
import FormularioPage from './pages/FormularioPage';
import Sidebar from './components/Sidebar';

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
  const location = useLocation();

  // Rutas fullscreen (sin sidebar ni contenedor principal)
  const fullscreenPaths = ['/login', '/formulario'];
  const isFullscreen = fullscreenPaths.includes(location.pathname);

  if (isFullscreen) {
    return <FullscreenRoutes />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--gray-50)' }}>
      {/* Sidebar fijo a la izquierda */}
      <Sidebar />

      {/* Área de contenido principal con scroll independiente */}
      <div style={{ flex: 1, minWidth: 0, height: '100vh', overflowY: 'auto' }}>
        <main className="container-fluid py-4 px-4 px-lg-5">
          <LayoutRoutes />
        </main>
      </div>
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
