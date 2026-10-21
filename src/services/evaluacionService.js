import { mockData } from '../data/mock';
import { formatDateISO } from '../utils/helpers';

let evaluaciones = [...mockData.evaluaciones];

export const evaluacionService = {
  getAll: async () => {
    return Promise.resolve(evaluaciones);
  },
  getById: async (id) => {
    const e = evaluaciones.find(x => x.id === Number(id));
    return Promise.resolve(e || null);
  },
  getBySolicitudId: async (solicitudId) => {
    const e = evaluaciones.find(x => x.solicitudId === Number(solicitudId));
    return Promise.resolve(e || null);
  },
  create: async (data) => {
    const nuevo = {
      id: evaluaciones.length > 0 ? Math.max(...evaluaciones.map(e => e.id)) + 1 : 1,
      ...data,
      fechaRegistro: formatDateISO(new Date())
    };
    evaluaciones.push(nuevo);
    return Promise.resolve(nuevo);
  },
  update: async (id, data) => {
    const idx = evaluaciones.findIndex(x => x.id === Number(id));
    if (idx === -1) return Promise.reject(new Error('No encontrado'));
    evaluaciones[idx] = { ...evaluaciones[idx], ...data };
    return Promise.resolve(evaluaciones[idx]);
  },
  delete: async (id) => {
    const idx = evaluaciones.findIndex(x => x.id === Number(id));
    if (idx === -1) return Promise.reject(new Error('No encontrado'));
    evaluaciones.splice(idx, 1);
    return Promise.resolve(true);
  }
};
