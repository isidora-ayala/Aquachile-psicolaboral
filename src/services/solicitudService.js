import { mockData } from '../data/mock';
import { formatDateISO } from '../utils/helpers';

let solicitudes = [...mockData.solicitudes];

export const solicitudService = {
  getAll: async () => {
    const { candidatos, cargos } = mockData;
    return Promise.resolve(
      solicitudes.map(s => {
        const candidato = candidatos.find(c => c.id === s.candidatoId);
        const cargo = cargos.find(c => c.id === s.cargoId);
        return {
          ...s,
          candidatoNombre: candidato?.nombre || 'Desconocido',
          cargoNombre: cargo?.nombre || 'Desconocido'
        };
      })
    );
  },
  getById: async (id) => {
    const s = solicitudes.find(x => x.id === Number(id));
    if (!s) return Promise.resolve(null);
    const { candidatos, cargos } = mockData;
    const candidato = candidatos.find(c => c.id === s.candidatoId);
    const cargo = cargos.find(c => c.id === s.cargoId);
    return Promise.resolve({
      ...s,
      candidatoNombre: candidato?.nombre || 'Desconocido',
      cargoNombre: cargo?.nombre || 'Desconocido'
    });
  },
  create: async (data) => {
    const nuevo = {
      id: solicitudes.length > 0 ? Math.max(...solicitudes.map(s => s.id)) + 1 : 1,
      ...data,
      fechaSolicitud: formatDateISO(new Date())
    };
    solicitudes.push(nuevo);
    return Promise.resolve(nuevo);
  },
  update: async (id, data) => {
    const idx = solicitudes.findIndex(x => x.id === Number(id));
    if (idx === -1) return Promise.reject(new Error('No encontrado'));
    solicitudes[idx] = { ...solicitudes[idx], ...data };
    return Promise.resolve(solicitudes[idx]);
  },
  delete: async (id) => {
    const idx = solicitudes.findIndex(x => x.id === Number(id));
    if (idx === -1) return Promise.reject(new Error('No encontrado'));
    solicitudes.splice(idx, 1);
    return Promise.resolve(true);
  },
  cambiarEstado: async (id, estado) => {
    const idx = solicitudes.findIndex(x => x.id === Number(id));
    if (idx === -1) return Promise.reject(new Error('No encontrado'));
    solicitudes[idx] = { ...solicitudes[idx], estado };
    return Promise.resolve(solicitudes[idx]);
  }
};
