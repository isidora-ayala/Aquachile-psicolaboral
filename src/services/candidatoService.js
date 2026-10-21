import { mockData } from '../data/mock';
import { formatDateISO } from '../utils/helpers';

let candidatos = [...mockData.candidatos];

export const candidatoService = {
  getAll: async () => {
    const { cargos, familiasCargo } = mockData;
    return Promise.resolve(
      candidatos.map(c => {
        const cargo = cargos.find(x => x.id === c.cargoId);
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
    const c = candidatos.find(x => x.id === Number(id));
    if (!c) return Promise.resolve(null);
    const { cargos, familiasCargo } = mockData;
    const cargo = cargos.find(x => x.id === c.cargoId);
    const familia = cargo ? familiasCargo.find(f => f.id === cargo.familiaCargoId) : null;
    return Promise.resolve({
      ...c,
      cargoPostula: cargo?.nombre || 'Desconocido',
      familiaCargo: familia?.nombre || 'Desconocido',
      fechaRegistro: c.creadoEn
    });
  },
  create: async (data) => {
    const nuevo = {
      id: candidatos.length > 0 ? Math.max(...candidatos.map(c => c.id)) + 1 : 1,
      ...data,
      creadoEn: formatDateISO(new Date())
    };
    candidatos.push(nuevo);
    return Promise.resolve(nuevo);
  },
  update: async (id, data) => {
    const idx = candidatos.findIndex(x => x.id === Number(id));
    if (idx === -1) return Promise.reject(new Error('No encontrado'));
    candidatos[idx] = { ...candidatos[idx], ...data };
    return Promise.resolve(candidatos[idx]);
  },
  delete: async (id) => {
    const idx = candidatos.findIndex(x => x.id === Number(id));
    if (idx === -1) return Promise.reject(new Error('No encontrado'));
    candidatos.splice(idx, 1);
    return Promise.resolve(true);
  }
};
