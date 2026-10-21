import { solicitudes, cargos, familiasCargo, evaluaciones } from '../data/mock';

export const calcularResumen = () => {
    const totalCandidatos = new Set(solicitudes.map(s => s.candidatoId)).size;
    const totalSolicitudes = solicitudes.length;
    const pendientes = solicitudes.filter(s => s.estado === 'Pendiente').length;
    const enProceso = solicitudes.filter(s => s.estado === 'En_Proceso').length;
    const finalizadas = solicitudes.filter(s => s.estado === 'Finalizada').length;
    return { totalCandidatos, totalSolicitudes, pendientes, enProceso, finalizadas };
};

export const calcularPorEstado = () => {
    const conteo = solicitudes.reduce((acc, s) => {
        acc[s.estado] = (acc[s.estado] || 0) + 1;
        return acc;
    }, {});

    const labelMap = {
        'Pendiente': 'Pendiente',
        'En_Proceso': 'En Proceso',
        'Finalizada': 'Finalizada'
    };

    return Object.keys(conteo).map(estado => ({
        name: labelMap[estado] || estado,
        value: conteo[estado]
    }));
};

// Calcula la cantidad de solicitudes por familia de cargo
export const calcularPorFamilia = () => {
    const conteo = {};
    solicitudes.forEach(s => {
        const cargo = cargos.find(c => c.id === s.cargoId);
        if (!cargo) return;
        const familia = familiasCargo.find(f => f.id === cargo.familiaCargoId);
        if (familia) {
            conteo[familia.nombre] = (conteo[familia.nombre] || 0) + 1;
        }
    });
    return Object.keys(conteo).map(nombre => ({ familiaCargo: nombre, total: conteo[nombre] }));
};

// Calcular las solicitudes por mes
export const calcularPorMes = () => {
    const conteo = {};
    solicitudes.forEach(s => {
        const mes = s.fechaSolicitud.substring(0, 7);
        conteo[mes] = (conteo[mes] || 0) + 1;
    });
    return Object.keys(conteo)
        .sort()
        .map(mes => ({ mes, total: conteo[mes] }));
};

// Calcular cantidad de evaluaciones por categoria
export const calcularResultados = () => {
    const conteo = evaluaciones.reduce((acc, e) => {
        if (e.categoria) {
            acc[e.categoria] = (acc[e.categoria] || 0) + 1;
        }
        return acc;
    }, {});
    return Object.keys(conteo).map(categoria => ({ categoria, total: conteo[categoria] }));
};

// Calcular tiempo promedio de evaluación (en días)
export const calcularTiempoPromedio = () => {
    const finalizadas = solicitudes.filter(s => s.estado === 'Finalizada');
    if (finalizadas.length === 0) return 0;
    const totalDias = finalizadas.reduce((acc, s) => {
        const evaluacion = evaluaciones.find(e => e.solicitudId === s.id);
        if (!evaluacion || !evaluacion.fechaEvaluacion) return acc;
        const diff = new Date(evaluacion.fechaEvaluacion) - new Date(s.fechaSolicitud);
        return acc + diff / (1000 * 60 * 60 * 24);
    }, 0);
    return Math.round(totalDias / finalizadas.length);
};
