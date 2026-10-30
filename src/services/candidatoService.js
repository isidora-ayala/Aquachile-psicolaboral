import { mockData } from '../data/mock';
import { formatDateISO } from '../utils/helpers';

const STORAGE_KEY = 'aquachile_candidatos_db';

// Función para obtener candidatos desde localStorage o inicializar con mockData
const obtenerCandidatos = () => {
  try {
    const dataGuardada = localStorage.getItem(STORAGE_KEY);
    if (dataGuardada) {
      return JSON.parse(dataGuardada);
    }
  } catch (error) {
    console.error('Error al leer candidatos de localStorage:', error);
  }
  return [...mockData.candidatos];
};

// Guardar en localStorage y notificar a la app
const guardarCandidatos = (lista) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('candidatos_actualizados'));
    }
  } catch (error) {
    console.error('Error al guardar candidatos en localStorage:', error);
  }
};

export const candidatoService = {
  getAll: async () => {
    const candidatos = obtenerCandidatos();
    const { cargos, familiasCargo } = mockData;
    return Promise.resolve(
      candidatos.map(c => {
        const cargo = cargos.find(x => x.id === Number(c.cargoId));
        const familia = cargo ? familiasCargo.find(f => f.id === cargo.familiaCargoId) : null;
        return {
          ...c,
          cargoPostula: cargo?.nombre || 'Desconocido',
          familiaCargo: familia?.nombre || 'Desconocido',
          fechaRegistro: c.creadoEn
        };
      })
    );
  },

  getById: async (id) => {
    const candidatos = obtenerCandidatos();
    const c = candidatos.find(x => x.id === Number(id));
    if (!c) return Promise.resolve(null);
    const { cargos, familiasCargo } = mockData;
    const cargo = cargos.find(x => x.id === Number(c.cargoId));
    const familia = cargo ? familiasCargo.find(f => f.id === cargo.familiaCargoId) : null;
    return Promise.resolve({
      ...c,
      cargoPostula: cargo?.nombre || 'Desconocido',
      familiaCargo: familia?.nombre || 'Desconocido',
      fechaRegistro: c.creadoEn
    });
  },

  create: async (data) => {
    const candidatos = obtenerCandidatos();
    const nuevoId = candidatos.length > 0 ? Math.max(...candidatos.map(c => c.id || 0)) + 1 : 1;
    const nuevo = {
      id: nuevoId,
      ...data,
      creadoEn: formatDateISO(new Date())
    };
    candidatos.unshift(nuevo); // Agregar al inicio para que aparezca primero
    guardarCandidatos(candidatos);
    return Promise.resolve(nuevo);
  },

  update: async (id, data) => {
    const candidatos = obtenerCandidatos();
    const idx = candidatos.findIndex(x => x.id === Number(id));
    if (idx === -1) return Promise.reject(new Error('No encontrado'));
    candidatos[idx] = { ...candidatos[idx], ...data };
    guardarCandidatos(candidatos);
    return Promise.resolve(candidatos[idx]);
  },

  delete: async (id) => {
    const candidatos = obtenerCandidatos();
    const idx = candidatos.findIndex(x => x.id === Number(id));
    if (idx === -1) return Promise.reject(new Error('No encontrado'));
    candidatos.splice(idx, 1);
    guardarCandidatos(candidatos);
    return Promise.resolve(true);
  }
};
