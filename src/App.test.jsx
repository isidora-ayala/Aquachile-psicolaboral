import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { formatDateDDMMYYYY, getEstadoLabel } from './utils/helpers';
import { authService } from './services/authService';
import FormularioCandidato from './components/Formulario/formulario';

describe('Suite de 5 Tests Esenciales para AquaChile', () => {

  // -------------------------------------------------------------
  // TEST 1: Prueba de función pura (Fechas)
  // -------------------------------------------------------------
  it('TEST 1: Debe formatear correctamente una fecha de YYYY-MM-DD a DD/MM/YYYY', () => {
    // 1. Preparamos el dato de entrada
    const fechaEntrada = '2026-10-28';
    
    // 2. Ejecutamos la función helper
    const resultado = formatDateDDMMYYYY(fechaEntrada);
    
    // 3. Verificamos que el resultado sea el esperado
    expect(resultado).toBe('28/10/2026');
  });

  // -------------------------------------------------------------
  // TEST 2: Prueba de lógica condicional (Etiquetas de estado)
  // -------------------------------------------------------------
  it('TEST 2: Debe transformar el estado técnico "En_Proceso" a texto legible "En Proceso"', () => {
    // Verificamos que devuelva el texto amigable para mostrar en la interfaz
    const etiqueta = getEstadoLabel('En_Proceso');
    expect(etiqueta).toBe('En Proceso');
  });

  // -------------------------------------------------------------
  // TEST 3: Prueba asíncrona exitosa (Login con credenciales válidas)
  // -------------------------------------------------------------
  it('TEST 3: Debe iniciar sesión exitosamente con credenciales correctas', async () => {
    // Usamos el usuario mock analista configurado en el sistema
    const respuesta = await authService.login('analista@aquachile.cl', '1234');

    // Comprobamos que el resultado sea exitoso y traiga el rol correcto
    expect(respuesta.success).toBe(true);
    expect(respuesta.user.rol).toBe('ANALISTA');
  });

  // -------------------------------------------------------------
  // TEST 4: Prueba asíncrona de error (Login con contraseña incorrecta)
  // -------------------------------------------------------------
  it('TEST 4: Debe rechazar el inicio de sesión si la contraseña es incorrecta', async () => {
    const respuesta = await authService.login('analista@aquachile.cl', 'clave_falsa_999');

    // Comprobamos que no permita ingresar y retorne mensaje de error
    expect(respuesta.success).toBe(false);
    expect(respuesta.error).toBe('Credenciales inválidas');
  });

  // -------------------------------------------------------------
  // TEST 5: Prueba de renderizado de componente React (Formulario de Postulación)
  // -------------------------------------------------------------
  it('TEST 5: Debe renderizar el formulario con su botón de "Enviar Postulación"', () => {
    // 1. Dibujamos (renderizamos) el componente en el navegador virtual
    render(<FormularioCandidato />);

    // 2. Buscamos el botón principal de enviar
    const botonEnviar = screen.getByRole('button', { name: /enviar postulación/i });

    // 3. Verificamos que el botón existe y está visible en pantalla
    expect(botonEnviar).toBeInTheDocument();
  });

});
