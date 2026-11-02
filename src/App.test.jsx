import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { formatDateDDMMYYYY, getEstadoLabel, normalizarEmail } from './utils/helpers';
import { authService } from './services/authService';
import FormularioCandidato from './components/Formulario/formulario';
import Sidebar from './components/Sidebar';
import * as AuthContextModule from './context/AuthContext';

// Helper de navegación con MemoryRouter (siguiendo Secciones 14 y 15 de la guía didáctica)
function renderSidebarWithRouter(initialPath = '/') {
  // Simulamos usuario administrador autenticado para ver todos los enlaces
  vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
    user: { nombre: 'María González', email: 'analista@aquachile.cl', rol: 'ADMIN' },
    logout: vi.fn(),
    hasRole: () => true,
    isAuthenticated: true,
  });

  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Sidebar />
      <Routes>
        <Route path="/" element={<h1>Dashboard Page</h1>} />
        <Route path="/candidatos" element={<h1>Candidatos Page</h1>} />
        <Route path="/solicitudes" element={<h1>Solicitudes Page</h1>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Suite de Pruebas Unitarias - AquaChile VcM (Guía Didáctica)', () => {

  // -------------------------------------------------------------
  // SECCIÓN 3 y 5: Funciones Puras y Reto normalizarEmail
  // -------------------------------------------------------------
  describe('Reto Didáctico: Función normalizarEmail (Sección 5)', () => {
    it('normaliza mayúsculas y elimina espacios iniciales/finales', () => {
      expect(normalizarEmail('  ANALISTA@AQUACHILE.CL  ')).toBe('analista@aquachile.cl');
    });

    it('retorna string vacío si la entrada es vacía o nula', () => {
      expect(normalizarEmail('')).toBe('');
      expect(normalizarEmail(null)).toBe('');
    });
  });

  describe('Helpers del Dominio AquaChile', () => {
    it('formatea correctamente una fecha de YYYY-MM-DD a DD/MM/YYYY', () => {
      expect(formatDateDDMMYYYY('2026-10-28')).toBe('28/10/2026');
    });

    it('transforma el código técnico "En_Proceso" a texto legible "En Proceso"', () => {
      expect(getEstadoLabel('En_Proceso')).toBe('En Proceso');
    });
  });

  // -------------------------------------------------------------
  // SERVICIOS: Autenticación Asíncrona
  // -------------------------------------------------------------
  describe('Servicio de Autenticación (authService)', () => {
    it('inicia sesión exitosamente con credenciales correctas', async () => {
      const respuesta = await authService.login('analista@aquachile.cl', '1234');
      expect(respuesta.success).toBe(true);
      expect(respuesta.user.rol).toBe('ANALISTA');
    });

    it('rechaza el inicio de sesión si la contraseña es incorrecta', async () => {
      const respuesta = await authService.login('analista@aquachile.cl', 'clave_falsa_999');
      expect(respuesta.success).toBe(false);
      expect(respuesta.error).toBe('Credenciales inválidas');
    });
  });

  // -------------------------------------------------------------
  // FORMULARIO: Renderizado con React Testing Library
  // -------------------------------------------------------------
  describe('Formulario de Postulación', () => {
    it('renderiza el formulario con su botón accesible de "Enviar Postulación"', () => {
      render(<FormularioCandidato />);
      const botonEnviar = screen.getByRole('button', { name: /enviar postulación/i });
      expect(botonEnviar).toBeInTheDocument();
    });
  });

  // -------------------------------------------------------------
  // SECCIONES 8-15: Test de Layout y Sidebar (MemoryRouter & userEvent)
  // -------------------------------------------------------------
  describe('Test de Navegación y Sidebar (Secciones 8 a 15)', () => {
    it('Caso 1 (Estructura): renderiza el elemento aside con la clase sidebar', () => {
      renderSidebarWithRouter('/');
      const sidebar = screen.getByRole('complementary');
      expect(sidebar).toBeInTheDocument();
      expect(sidebar).toHaveClass('sidebar');
    });

    it('Caso 2 (Rutas): muestra los enlaces con sus rutas href correctas', () => {
      renderSidebarWithRouter('/');
      expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/');
      expect(screen.getByRole('link', { name: /candidatos/i })).toHaveAttribute('href', '/candidatos');
      expect(screen.getByRole('link', { name: /solicitudes/i })).toHaveAttribute('href', '/solicitudes');
    });

    it('Caso 3 (Ruta Activa): marca el enlace activo según la URL inicial', () => {
      renderSidebarWithRouter('/candidatos');
      const linkCandidatos = screen.getByRole('link', { name: /candidatos/i });
      const linkDashboard = screen.getByRole('link', { name: /dashboard/i });

      expect(linkCandidatos).toHaveClass('active');
      expect(linkDashboard).not.toHaveClass('active');
    });

    it('Caso 4 (El Clic con userEvent): navega y actualiza el enlace activo al hacer clic', async () => {
      const user = userEvent.setup();
      renderSidebarWithRouter('/');

      const linkSolicitudes = screen.getByRole('link', { name: /solicitudes/i });
      await user.click(linkSolicitudes);

      // Verifica que el contenido de la ruta cambió y el link quedó activo
      expect(screen.getByRole('heading', { name: 'Solicitudes Page' })).toBeInTheDocument();
      expect(linkSolicitudes).toHaveClass('active');
    });
  });

});
