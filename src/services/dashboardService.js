import { calcularResumen, calcularPorEstado, calcularPorMes } from '../utils/metricas';

export const dashboardService = {
    getResumen: async () => {
        await new Promise(r => setTimeout(r, 100));
        return calcularResumen();
    },

    getPorEstado: async () => {
        await new Promise(r => setTimeout(r, 100));
        return calcularPorEstado();
    },

    getPorMes: async () => {
        await new Promise(r => setTimeout(r, 100));
        return calcularPorMes();
    },

    getUltimasSolicitudes: async (limit = 5) => {
        await new Promise(r => setTimeout(r, 100));
        const { solicitudes, candidatos, cargos } = await import('../data/mock');
        const sorted = [...solicitudes].sort((a, b) =>
            new Date(b.fechaSolicitud) - new Date(a.fechaSolicitud)
        ).slice(0, limit);

        return sorted.map(s => {
            const candidato = candidatos.find(c => c.id === s.candidatoId);
            const cargo = cargos.find(c => c.id === s.cargoId);
            return {
                ...s,
                candidatoNombre: candidato?.nombre || 'Desconocido',
                cargoNombre: cargo?.nombre || 'Desconocido'
            };
        });
    }
};
