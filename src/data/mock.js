export const usuarios = [
  { id: 1, email: 'analista@aquachile.cl', password: '1234', rol: 'ANALISTA', nombre: 'María González', activo: 1 },
  { id: 2, email: 'evaluador@aquachile.cl', password: '1234', rol: 'EVALUADOR', nombre: 'Carlos Ruiz', activo: 1 },
  { id: 3, email: 'admin@aquachile.cl', password: '1234', rol: 'ADMIN', nombre: 'Ana Torres', activo: 1 },
];

export const familiasCargo = [
  { id: 1, nombre: 'Directivo' },
  { id: 2, nombre: 'Profesional' },
  { id: 3, nombre: 'Técnico' },
  { id: 4, nombre: 'Administrativo' },
];

export const cargos = [
  { id: 1, nombre: 'Gerente', familiaCargoId: 1 },
  { id: 2, nombre: 'Analista', familiaCargoId: 2 },
  { id: 3, nombre: 'Desarrollador', familiaCargoId: 2 },
  { id: 4, nombre: 'Secretaria', familiaCargoId: 4 },
  { id: 5, nombre: 'Inspector', familiaCargoId: 3 },
];

export const candidatos = [
  { id: 1, nombre: 'José Martínez', correo: 'jose@test.cl', telefono: '987654321', cargoId: 3, creadoEn: '2024-01-15' },
  { id: 2, nombre: 'Laura Gómez', correo: 'laura@test.cl', telefono: '987654322', cargoId: 2, creadoEn: '2024-02-20' },
  { id: 3, nombre: 'Pedro Sánchez', correo: 'pedro@test.cl', telefono: '987654323', cargoId: 1, creadoEn: '2024-03-10' },
  { id: 4, nombre: 'Ana Pérez', correo: 'ana@test.cl', telefono: '987654324', cargoId: 4, creadoEn: '2024-04-05' },
  { id: 5, nombre: 'Diego Ríos', correo: 'diego@test.cl', telefono: '987654325', cargoId: 5, creadoEn: '2024-05-12' },
  { id: 6, nombre: 'Sofía Torres', correo: 'sofia@test.cl', telefono: '987654326', cargoId: 3, creadoEn: '2024-06-18' },
  { id: 7, nombre: 'Martín López', correo: 'martin@test.cl', telefono: '987654327', cargoId: 1, creadoEn: '2024-07-22' },
  { id: 8, nombre: 'Carla Fernández', correo: 'carla@test.cl', telefono: '987654328', cargoId: 2, creadoEn: '2024-08-30' },
];

export const solicitudes = [
  { id: 1, candidatoId: 1, cargoId: 3, evaluadorId: 2, analistaId: 1, estado: 'En_Proceso', fechaSolicitud: '2024-09-01', observaciones: null },
  { id: 2, candidatoId: 2, cargoId: 2, evaluadorId: null, analistaId: 1, estado: 'Pendiente', fechaSolicitud: '2024-09-10', observaciones: null },
  { id: 3, candidatoId: 3, cargoId: 1, evaluadorId: 3, analistaId: 1, estado: 'Finalizada', fechaSolicitud: '2024-09-15', observaciones: 'Excelente perfil' },
  { id: 4, candidatoId: 4, cargoId: 4, evaluadorId: null, analistaId: 1, estado: 'Pendiente', fechaSolicitud: '2024-09-20', observaciones: null },
  { id: 5, candidatoId: 5, cargoId: 5, evaluadorId: 3, analistaId: 1, estado: 'En_Proceso', fechaSolicitud: '2024-09-25', observaciones: null },
  { id: 6, candidatoId: 1, cargoId: 3, evaluadorId: 2, analistaId: 1, estado: 'Finalizada', fechaSolicitud: '2024-10-01', observaciones: 'Buen candidato' },
  { id: 7, candidatoId: 6, cargoId: 3, evaluadorId: null, analistaId: 1, estado: 'Pendiente', fechaSolicitud: '2024-10-05', observaciones: null },
  { id: 8, candidatoId: 7, cargoId: 1, evaluadorId: 2, analistaId: 1, estado: 'Finalizada', fechaSolicitud: '2024-10-10', observaciones: 'No tiene experiencia' },
  { id: 9, candidatoId: 8, cargoId: 2, evaluadorId: null, analistaId: 1, estado: 'Pendiente', fechaSolicitud: '2024-10-12', observaciones: null },
  { id: 10, candidatoId: 2, cargoId: 5, evaluadorId: 2, analistaId: 1, estado: 'En_Proceso', fechaSolicitud: '2024-10-18', observaciones: null },
];

export const evaluaciones = [
  { id: 1, solicitudId: 1, fechaEvaluacion: '2024-10-10', resultado: 'Buen desempeño psicolaboral', categoria: 'RECOMENDADO', estado: 'FINALIZADA' },
  { id: 2, solicitudId: 2, fechaEvaluacion: null, resultado: null, categoria: null, estado: 'PENDIENTE' },
  { id: 3, solicitudId: 3, fechaEvaluacion: '2024-10-01', resultado: 'Excelente perfil directivo', categoria: 'RECOMENDADO', estado: 'FINALIZADA' },
  { id: 4, solicitudId: 4, fechaEvaluacion: null, resultado: null, categoria: null, estado: 'PENDIENTE' },
  { id: 5, solicitudId: 5, fechaEvaluacion: null, resultado: null, categoria: null, estado: 'EN_PROCESO' },
  { id: 6, solicitudId: 6, fechaEvaluacion: '2024-10-15', resultado: 'Buen candidato con áreas de mejora', categoria: 'RECOMENDADO_CON_OBSERVACIONES', estado: 'FINALIZADA' },
  { id: 7, solicitudId: 7, fechaEvaluacion: null, resultado: null, categoria: null, estado: 'PENDIENTE' },
  { id: 8, solicitudId: 8, fechaEvaluacion: '2024-10-20', resultado: 'No cumple requisitos de experiencia', categoria: 'NO_RECOMENDADO', estado: 'FINALIZADA' },
  { id: 9, solicitudId: 9, fechaEvaluacion: null, resultado: null, categoria: null, estado: 'PENDIENTE' },
  { id: 10, solicitudId: 10, fechaEvaluacion: null, resultado: null, categoria: null, estado: 'EN_PROCESO' },
];

export const mockData = { usuarios, familiasCargo, cargos, candidatos, solicitudes, evaluaciones };